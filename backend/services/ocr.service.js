import axios from "axios";
import FormData from "form-data";
import { GoogleGenerativeAI } from "@google/generative-ai";

const OCR_SPACE_API_URL = "https://api.ocr.space/parse/image";
const OCR_SPACE_API_KEY = process.env.OCR_SPACE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const getOcrText = async (imageBuffer, engineNumber = 2) => {
  try {
    const form = new FormData();
    form.append("apikey", OCR_SPACE_API_KEY);
    form.append("OCREngine", String(engineNumber));
    form.append("file", imageBuffer, {
      filename: "image.jpg",
      contentType: "image/jpeg",
    });

    const resp = await axios.post(OCR_SPACE_API_URL, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 60_000,
    });

    const data = resp.data;
    if (data?.IsErroredOnProcessing) {
      console.warn("OCR.space error:", data.ErrorMessage);
      return "";
    }

    return data?.ParsedResults?.[0]?.ParsedText ?? "";
  } catch (err) {
    console.error("OCR request failed:", err?.message ?? err);
    return "";
  }
};

export const extractStructuredData = async (textToAnalyze) => {
  if (!textToAnalyze || !String(textToAnalyze).trim()) return null;

  const basePrompt = () =>
    `
You are an expert data extractor for packaged health / food products (e.g., dietary supplements, powders, breakfast cereals, health bars).
Return a SINGLE JSON object only (no commentary, no code fences, no extra text) with product identification and ingredients extracted from the text below (the "text in the image").

IMPORTANT BEHAVIOR (follow exactly):
1. First, attempt to **generate** a sensible product name and a brief user-facing description (consumption guidance if present) **using only the information in the text**. The model should try to infer a productName and description from brand cues, typography, headings, nutrition facts, and ingredients in the text even if an explicit product name string is not present.
2. If the product cannot be confidently identified from the text alone, you MAY perform focused web search **only to confirm** identity and description. When using web search, consult only AUTHENTIC sources (manufacturer pages, official product label scans, government nutrition databases, or major retailer product pages). Prefer sources in this order: manufacturer > national nutrition database > reputable retailer/product archive. Do NOT use forums, low-quality blogs, or unverified content.
3. If after reading the text and checking authentic sources you still cannot confidently identify productName or description, you ARE ALLOWED to infer/guess a best-fit productName and description based on the ingredients and nutrition facts. **Mark any inferred fields with the boolean flags below.**
4. DO NOT HALLUCINATE facts. Do not invent numeric quantities, manufacturer names, or serving sizes that are not present in the text or in an authoritative source you cite. Include numeric quantities for an ingredient ONLY if that quantity is present in the text or in an authoritative source you used.
5. NEVER use wording like "according to the OCR" or "the OCR says". If you must refer to the source, say "according to the text in the image".
6. Tone for description: write as a short helpful suggestion a human would give (concise, plain language, avoid AI/robotic phrasing such as "as an AI" or "I believe"). Example tone: "This appears to be a high-protein breakfast cereal; best consumed as 1 serving (50g) with milk or yogurt." Keep it practical.
7. For ingredients, output each item as:
   - "ingredientName"  (if no quantity), OR
   - "ingredientName (quantity and unit as shown)"  (e.g., "salt (50mg per 100g)") — include quantity ONLY if present in the text or an authoritative source.
8. ALWAYS return the JSON object exactly following the schema below. No surrounding text.

OUTPUT SCHEMA (JSON object):
{
  "productName": string | null,       // Strictly make sure you add the product name, if you do not find any then just generate a short name of product according to the the ingredients. And please make sure you do not miss it and please do not include numbers in product name it should be word(s) only.
  "productNameInferred": boolean,      // true if productName was inferred/guessed (not explicitly found or confirmed)
  "description": string | null,        // human-sounding suggestion; include consumption guidance if available
  "descriptionInferred": boolean,      // true if description was inferred/guessed
  "ingredients": [ "string", ... ] | [], // quantities included only if present in text or an authoritative source
  "sources": [ "https://manufacturer.example/product-page", ... ],  // URLs used to confirm info; empty array if none
  "confidence": number                 // integer 0-100 representing overall confidence in product identification
}

CONFIDENCE GUIDELINES:
- If productName and description were found verbatim in the text or confirmed on an official manufacturer page, confidence >= 85.
- If one or both fields were inferred from ingredients/nutrition facts and not confirmed on an authoritative source, confidence <= 70 and productNameInferred/descriptionInferred must be true.
- If nothing useful can be identified, return productName=null, description=null, ingredients:[], sources:[], confidence:0

EXAMPLES (valid ingredient formatting):
- "salt (50mg per 100g)"
- "oats"

Now analyze the text below and RETURN ONLY the JSON object that follows the schema above.

TEXT IN IMAGE:
---
${textToAnalyze}
---
JSON:

`.trim();

  // helper to parse a JSON block from raw text
  const tryParseJson = (text) => {
    if (!text) return null;
    // first try strict JSON parse
    try {
      return JSON.parse(text);
    } catch (e) {
      // fallback: extract first {...} block
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch (e2) {
          return null;
        }
      }
      return null;
    }
  };

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    //First attempt
    const prompt1 = basePrompt();
    const result1 = await model.generateContent(prompt1);

    // extract raw text robustly (mirrors runLLMAnalysis style)
    let rawText1 = null;
    try {
      if (result1?.response && typeof result1.response.text === "function") {
        rawText1 = await result1.response.text();
      }
    } catch (e) {
      // ignore and fallback
    }
    rawText1 =
      rawText1 ??
      result1?.text ??
      result1?.output?.[0]?.content?.[0]?.text ??
      result1?.candidates?.[0]?.content?.[0]?.text ??
      null;

    if (!rawText1) {
      // no text returned
      return { error: "No text returned from LLM." };
    }

    // try parse JSON
    let parsed = tryParseJson(rawText1);

    // Retry attempt if parse failed
    if (!parsed) {
      // Ask the model, referencing its previous output, to RETURN ONLY the JSON object
      const retryPrompt = `
        The previous response did not parse as strict JSON. Below is the model's previous output:

        ---MODEL OUTPUT START---
        ${rawText1}
        ---MODEL OUTPUT END---

        Please now RETURN EXACTLY one JSON object (and nothing else) that conforms to the schema below. Do NOT add any commentary or extra text. If some fields are not available, use null / empty array as appropriate.

        SCHEMA:
        {
        "productName": string|null,
        "productNameInferred": boolean,
        "description": string|null,
        "descriptionInferred": boolean,
        "ingredients": [ "string", ... ] | [],
        "sources": [ "https://...", ... ],
        "confidence": number
        }

        Return only the JSON.
        `;
      const result2 = await model.generateContent(retryPrompt);

      let rawText2 = null;
      try {
        if (result2?.response && typeof result2.response.text === "function") {
          rawText2 = await result2.response.text();
        }
      } catch (e) {}
      rawText2 =
        rawText2 ??
        result2?.text ??
        result2?.output?.[0]?.content?.[0]?.text ??
        result2?.candidates?.[0]?.content?.[0]?.text ??
        null;

      // try parse retry output
      parsed = tryParseJson(rawText2);

      // if still not parsed, return helpful debug info
      if (!parsed) {
        return {
          error: "Failed to parse JSON from AI response after retry.",
          _raw_model_output: rawText1,
        };
      }
    }

    //Normalise parsed object to expected schema
    const normalized = {
      productName: parsed.productName ?? null,
      productNameInferred:
        typeof parsed.productNameInferred === "boolean"
          ? parsed.productNameInferred
          : false,
      description: parsed.description ?? null,
      descriptionInferred:
        typeof parsed.descriptionInferred === "boolean"
          ? parsed.descriptionInferred
          : false,
      ingredients:
        Array.isArray(parsed.ingredients) && parsed.ingredients.length
          ? parsed.ingredients.map((i) => String(i).trim())
          : Array.isArray(parsed.ingredients)
          ? []
          : null,
      sources: Array.isArray(parsed.sources)
        ? parsed.sources.filter((s) => typeof s === "string" && s.trim())
        : [],
      confidence:
        typeof parsed.confidence === "number"
          ? Math.max(0, Math.min(100, Math.round(parsed.confidence)))
          : 0,
    };

    return normalized;
  } catch (err) {
    console.error("AI Data Extraction Error:", err?.message ?? err);
    return {
      error: err?.message ?? String(err),
    };
  }
};
