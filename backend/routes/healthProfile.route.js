import express from "express";
import { createHealthProfile, updateHealthProfile, deleteHealthProfile, getMyHealthProfiles, deleteUserAndProfiles } from "../controllers/healthProfile.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); 

router.post("/", createHealthProfile);
router.get("/", getMyHealthProfiles);
router.put("/:id", updateHealthProfile);
router.delete("/:id", deleteHealthProfile);
router.delete("/me", deleteUserAndProfiles);

export default router;
