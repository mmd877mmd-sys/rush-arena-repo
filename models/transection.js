import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["deposit", "withdraw", "bonus"],
    },
    method: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transactions ||
  mongoose.model("Transactions", TransactionSchema);
