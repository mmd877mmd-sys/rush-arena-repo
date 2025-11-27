import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // prevents duplicate tokens
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// This prevents model overwrite errors in Next.js hot reload
export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
