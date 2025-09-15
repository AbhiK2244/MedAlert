import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { generateAnalysisReport, getMyReports, getReportById } from "../controllers/analysisReport.controller.js";

const router = express.Router();

router.use(authMiddleware); 

router.post("/", generateAnalysisReport);
router.get("/", getMyReports);
router.get("/:reportId", getReportById);

export default router;
