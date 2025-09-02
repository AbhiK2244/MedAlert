import express from "express";
import {signup, signin, logout } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

//create a user
router.post("/signup", signup)

//sign-in 
router.post("/signin", signin)

//logout
router.post("/logout", authMiddleware, logout)

export default router;