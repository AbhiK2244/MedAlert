import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { generateAnalysisReport } from "../controllers/analysisReport.controller.js";

const router = express.Router();

router.use(authMiddleware); 

router.post("/", generateAnalysisReport);

export default router;
