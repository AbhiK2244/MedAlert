// controllers/analysis.controller.js
import createHttpError from "http-errors";
import { createResponse } from "../services/createResponse.service.js";
import AnalysisReport from "../models/analysisReport.model.js";
import HealthProfile from "../models/healthProfile.model.js";
import { runLLMAnalysis } from "../services/llm.service.js";

/**
 * Generate a report using OCR JSON, user notes, and health profile
 */
export const generateAnalysisReport = async (req, res, next) => {
  try {
    const userId = req.userId; // from auth middleware
    if (!userId) throw createHttpError(401, "Unauthorized");

    console.log("Received analysis report request:", req.body); 
    const { ocrResult, userNotes } = req.body;
    if (!ocrResult?.ingredients?.length) {
      throw createHttpError(400, "OCR result with ingredients is required");
    }

    // get latest health profile snapshot
    const health = await HealthProfile.findOne({ user: userId }).sort({ createdAt: -1 });
    console.log("Health of the user", health)
    if (!health) throw createHttpError(400, "Health profile is required");

    // send to LLM service
    const llmResult = await runLLMAnalysis({
      ocrResult,
      userNotes,
      healthSnapshot: {
        age: health.age,
        gender: health.gender,
        height: health.height,
        weight: health.weight,
        bpLevel: health.bpLevel,
        sugarLevel: health.sugarLevel,
        allergies: health.allergies
      }
    });

    // save in DB
    const report = await AnalysisReport.create({
      user: userId,
      ocrResult,
      userNotes,
      ...llmResult
    });

    res.status(201).send(createResponse(report, "Analysis report generated"));
  } catch (error) {
    next(error);
  }
};
