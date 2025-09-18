import { createResponse } from "../services/createResponse.service.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const sanitizeUser = (userDoc) => {
  const { password: _, ...data } = userDoc._doc ?? userDoc;
  return data;
};

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

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createHttpError(400, "Email is required");

    const user = await User.findOne({ email });
    if (!user) throw createHttpError(404, "User with given email not found");

    // Use a separate secret for reset tokens if possible
    const resetSecret = process.env.JWT_RESET_SECRET || process.env.JWT_SECRET;
    const resetToken = jwt.sign({ id: user._id }, resetSecret, {
      expiresIn: "1h",
    });

    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

    // === EMAIL SENDING (OPTIONAL) ===
    // If you have a sendEmail service, call it here. Example:
    // import sendEmail from "../services/sendEmail.service.js";
    // await sendEmail({
    //   to: user.email,
    //   subject: "MedAlert — Reset your password",
    //   text: `Reset your password: ${resetUrl}`
    // });
    // If you don't have email configured, the resetUrl will be returned in the response for development.

    // In production, don't return the reset link in the response.
    const returnLink = process.env.NODE_ENV === "production" ? null : resetUrl;

    res.send(
      createResponse(
        { resetUrl: returnLink },
        "Password reset link generated. Check your email for instructions."
      )
    );
  } catch (error) {
    next(error);
  }
};


export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token) throw createHttpError(400, "Reset token is required");
    if (!newPassword) throw createHttpError(400, "New password is required");

    const resetSecret = process.env.JWT_RESET_SECRET || process.env.JWT_SECRET;
    let decoded;
    try {
      decoded = jwt.verify(token, resetSecret);
    } catch (err) {
      throw createHttpError(400, "Invalid or expired reset token");
    }

    const user = await User.findById(decoded.id);
    if (!user) throw createHttpError(404, "User not found");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Optionally sign the user in after reset (same as signup/signin)
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const dataToReturn = sanitizeUser(user);
    res.send(createResponse({ accessToken, user: dataToReturn }, "Password reset successful"));
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw createHttpError(401, "User not authenticated");

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw createHttpError(400, "Both currentPassword and newPassword are required");
    }

    const user = await User.findById(userId);
    if (!user) throw createHttpError(404, "User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw createHttpError(401, "Current password is incorrect");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.send(createResponse({}, "Password changed successfully"));
  } catch (error) {
    next(error);
  }
};