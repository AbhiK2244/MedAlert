import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    healthProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "HealthProfile" }],
},
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);