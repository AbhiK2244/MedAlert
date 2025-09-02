import { createResponse } from "../services/createResponse.service.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      throw createHttpError(409, "User already exists. Please login instead.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    
    // Automatically sign in the user after successful signup
    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // Use 'none' for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Exclude password from the user object before sending the response

    const { password: _, ...dataToReturn } = newUser._doc;
    res.send(
      createResponse(
        { accessToken, user: dataToReturn },
        "User signed in successfully"
      )
    );
    
    // res.send(createResponse(newUser, "User created successfully"));
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const hash = user.password;
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw createHttpError(401, "Invalid password");
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // Use 'none' for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Exclude password from the user object before sending the response

    const { password: _, ...dataToReturn } = user._doc;
    res.send(
      createResponse(
        { accessToken, user: dataToReturn },
        "User signed in successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

// export const logout = (req, res) => {
//   res.cookie("accessToken", "").send(createResponse({}, "User logged out successfully"));
// };

export const logout = (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
        throw createHttpError(401, "User not authenticated");
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: false,
    });
    return res.send(createResponse({}, "User logged out successfully"));
  } catch (error) {
    next(error);
  }
};
