import createHttpError from "http-errors";
import { createResponse } from "../services/createResponse.service.js";
import AnalysisReport from "../models/analysisReport.model.js";
import HealthProfile from "../models/healthProfile.model.js";
import { runLLMAnalysis } from "../services/llm.service.js";

export const generateAnalysisReport = async (req, res, next) => {
  try {
    const userId = req.userId; // from auth middleware
    if (!userId) throw createHttpError(401, "Unauthorized");

    console.log("Received analysis report request:", req.body);
    const { ocrResult, userNotes } = req.body;
    if (!ocrResult?.ingredients?.length) {
      throw createHttpError(
        400,
        "Please provide the clear image with ingredients."
      );
    }

    // get latest health profile snapshot
    const health = await HealthProfile.findOne({ user: userId }).sort({
      createdAt: -1,
    });
    console.log("Health of the user", health);
    if (!health) throw createHttpError(400, "Health profile is required");

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
        allergies: health.allergies,
      },
    });

    const report = await AnalysisReport.create({
      user: userId,
      ocrResult,
      userNotes,
      ...llmResult,
    });

    res.status(201).send(createResponse(report, "Analysis report generated"));
  } catch (error) {
    next(error);
  }
};

export const getMyReports = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw createHttpError(401, "Unauthorized");

    const reports = await AnalysisReport.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.send(createResponse(reports, "Reports Fetched successfully."));
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { reportId } = req.params; // or req.query if using query param

    if (!userId) throw createHttpError(401, "Unauthorized");

    if (!reportId) throw createHttpError(400, "Report ID is required");

    // Find report by ID and also check ownership
    const report = await AnalysisReport.findOne({
      _id: reportId,
      user: userId,
    });

    if (!report) {
      throw createHttpError(404, "Report not found");
    }

    res.send(createResponse(report, "Report fetched successfully."));
  } catch (error) {
    next(error);
  }
};


