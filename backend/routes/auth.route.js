import express from "express";
import {signup, signin, logout } from "../controllers/auth.controller.js";

const router = express.Router();

//create a user
router.post("/signup", signup)

//sign-in 
router.post("/signin", signin)

//logout
router.get("/logout", logout)

export default router;