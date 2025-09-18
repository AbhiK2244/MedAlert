import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { deleteAllReports, deleteReportById, generateAnalysisReport, getMyReports, getReportById } from "../controllers/analysisReport.controller.js";

const router = express.Router();

router.use(authMiddleware); 

router.post("/", generateAnalysisReport);
router.get("/", getMyReports);
router.get("/:reportId", getReportById);
router.delete("/:reportId", deleteReportById);
router.delete("/", deleteAllReports);

export default router;
