import mongoose from "mongoose";
import HealthProfile from "../models/healthProfile.model.js";
import User from "../models/user.model.js";
import { createResponse } from "../services/createResponse.service.js";
import createHttpError from "http-errors";


export const createHealthProfile = async (req, res, next) => {
  try {
    const userId = req.userId; // Extracted from auth middleware
    if (!userId) throw createHttpError(401, "Unauthorized"); // If user not logged in

    // Create new profile linked to the user
    const profile = await HealthProfile.create({
      user: userId,
      ...req.body
    });

    // Push the new profile reference into the user's document
    await User.findByIdAndUpdate(userId, { $push: { healthProfiles: profile._id } });

    res.status(201).send(createResponse(profile, "Health profile created successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateHealthProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params; 

    // Check if profile exists
    const profile = await HealthProfile.findById(id);
    if (!profile) throw createHttpError(404, "Profile not found");

    // Ensure the logged-in user owns this profile
    if (profile.user.toString() !== userId) {
      throw createHttpError(403, "Unauthorized: access denied");
    }

    // Update profile fields
    Object.assign(profile, req.body);
    await profile.save();

    res.send(createResponse(profile, "Health profile updated successfully"));
  } catch (error) {
    next(error);
  }
};


export const deleteHealthProfile = async (req, res, next) => {
  try {
    const userId = req.userId; // Current logged-in user
    const { id } = req.params; // Health profile ID from request params

    // Check if profile exists
    const profile = await HealthProfile.findById(id);
    if (!profile) throw createHttpError(404, "Profile not found");

    // Ensure the logged-in user owns this profile
    if (profile.user.toString() !== userId) {
      throw createHttpError(403, "Forbidden: not the owner");
    }

    // Delete profile document
    await profile.deleteOne();

    // Remove reference from user document
    await User.findByIdAndUpdate(userId, { $pull: { healthProfiles: id } });

    res.send(createResponse({}, "Health profile deleted successfully"));
  } catch (error) {
    next(error);
  }
};


export const getMyHealthProfiles = async (req, res, next) => {
  try {
    const userId = req.userId; // Current logged-in user
    if (!userId) throw createHttpError(401, "Unauthorized");

    // Fetch all profiles for the user, newest first
    const profiles = await HealthProfile.find({ user: userId }).sort({ createdAt: -1 });

    res.send(createResponse(profiles, "Fetched health profiles successfully"));
  } catch (error) {
    next(error);
  }
};


export const deleteUserAndProfiles = async (req, res, next) => {
  const session = await mongoose.startSession(); // Start a MongoDB session
  try {
    const userId = req.userId; // Current logged-in user
    if (!userId) throw createHttpError(401, "Unauthorized");

    session.startTransaction(); // Begin transaction

    // Delete all health profiles of this user
    await HealthProfile.deleteMany({ user: userId }).session(session);

    // Delete the user document
    await User.findByIdAndDelete(userId).session(session);

    await session.commitTransaction(); // Commit transaction (both operations succeed)
    session.endSession();

    res.send(createResponse({}, "User and health profiles deleted successfully"));
  } catch (error) {
    await session.abortTransaction(); // Rollback changes if error occurs
    session.endSession();
    next(error); // Forward error to error handler
  }
};
 