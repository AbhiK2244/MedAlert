import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // legacy SDK
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Run health analysis using Gemini (legacy SDK) -- NO web search.
 * Tries to parse strict JSON from the model; falls back to a safe structure.
 */
export const runLLMAnalysis = async ({ ocrResult, userNotes, healthSnapshot }) => {
  // Explicitly forbid web search in the prompt
  const prompt = `
You are a health analysis assistant. Use ONLY the OCR data, user notes, and health profile.
DO NOT use web search or any external sources — rely only on the provided OCR, user notes, and health profile.
STRICTLY return JSON in this format:

{
  "usefulIngredients": [
    { "name": "Protein", "rationale": "Helps muscle growth", "quantityLimit": "Max 200g/day" }
  ],
  "harmfulIngredients": [
    { "name": "Sugar", "rationale": "Raises blood sugar", "quantityLimit": "Avoid completely" }
  ],
  "consumptionGuidelines": "Do not exceed 2 scoops per day",
  "foodSuggestions": "Combine with vegetables for fiber",
  "summary": "This product is safe for moderate use but risky for diabetics"
}

OCR RESULT:
${JSON.stringify(ocrResult ?? {}, null, 2)}

USER NOTES:
${userNotes || "N/A"}

HEALTH PROFILE:
${JSON.stringify(healthSnapshot ?? {}, null, 2)}
Make sure you are suggesting the personalized result with reference to the health profile of user and in summary mention a little about their health profile in personalized manner. 
Most important: Do not miss summary in the response.
`;

  try {
    // create a model instance (legacy SDK pattern)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use the simple generateContent(prompt) flow (no tools / no web search)
    const result = await model.generateContent(prompt);

    // Many legacy SDK responses expose a response-like object with .text()
    let rawText = null;
    try {
      if (result?.response && typeof result.response.text === "function") {
        rawText = await result.response.text();
      }
    } catch (e) {
      // ignore and fallback to other fields below
    }

    // Fallbacks for other possible response shapes
    if (!rawText) rawText = result?.text ?? null;
    if (!rawText) rawText = result?.output?.[0]?.content?.[0]?.text ?? null;
    if (!rawText) rawText = result?.candidates?.[0]?.content?.[0]?.text ?? null;

    // Try to parse JSON strictly; if it fails, try to extract JSON block
    let parsed = null;
    if (rawText) {
      try {
        parsed = JSON.parse(rawText);
      } catch (e) {
        const match = rawText.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            parsed = JSON.parse(match[0]);
          } catch (e2) {
            parsed = null;
          }
        }
      }
    }

    // If parsing failed, return safe fallback while including raw output for debugging
    if (!parsed) {
      parsed = {
        usefulIngredients: [],
        harmfulIngredients: [],
        consumptionGuidelines: "",
        foodSuggestions: "",
        summary: "",
        _raw_model_output: rawText ?? "[no text returned]",
      };
    }

    console.log("parsed result:", parsed)

    return {
      ...parsed,
      model: "gemini-1.5-flash",
      usedWebSearch: false,
      groundingMetadata: null,
    };
  } catch (err) {
    console.error("Gemini request failed:", err?.message ?? err);
    return {
      usefulIngredients: [],
      harmfulIngredients: [],
      consumptionGuidelines: "",
      foodSuggestions: "",
      summary: "",
      model: "gemini-1.5-flash",
      usedWebSearch: false,
      groundingMetadata: null,
      error: err?.message ?? String(err),
    };
  }
};
