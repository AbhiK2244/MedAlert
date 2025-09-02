import mongoose from "mongoose";

const healthProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Personal details
  fullName: { type: String },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  phoneNumber: { type: String, required: true },

  // Current health
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bpLevel: { type: String, enum: ["Normal", "High", "Low"], required: true },
  sugarLevel: { type: String, enum: ["Normal", "High", "Low"], required: true },

  // Optional
  medications: { type: String },
  additionalDetails: { type: String },
  allergies: { type: String }
}, { timestamps: true });

// index user to speed up queries by user
// This line creates an index in MongoDB so queries like “find the latest health profile of a user” run much faster. It sorts first by user (to quickly group profiles by user) and then by createdAt in descending order (so the most recent profile comes first).
healthProfileSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("HealthProfile", healthProfileSchema);
