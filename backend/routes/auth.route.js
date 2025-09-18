import express from "express";
import {signup, signin, logout, changePassword } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

//create a user
router.post("/signup", signup)

//sign-in 
router.post("/signin", signin)

//change passowrd
router.post("/change-password", authMiddleware, changePassword)

//logout
router.post("/logout", authMiddleware, logout)

export default router;