import express from "express";
import multer from "multer";
import { handleOcr } from "../controllers/ocr.controller.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("files[]"), handleOcr);

export default router;
