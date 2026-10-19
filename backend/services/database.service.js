import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("bufferTimeoutMS", 5000);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};

export default connectDB;