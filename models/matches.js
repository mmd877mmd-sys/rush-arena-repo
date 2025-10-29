import mongoose from "mongoose";

const MatchesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  matchType: {
    type: String,
    required: true,
    trim: true,
  },
  winPrize: {
    type: Number,
    required: true,
    trim: true,
  },
  perKill: {
    type: Number,
    required: true,
    trim: true,
  },
  entryFee: {
    type: Number,
    required: true,
    trim: true,
  },

  entryType: {
    type: String,
    required: true,
    trim: true,
  },
  map: {
    type: String,
    required: true,
    trim: true,
  },

  totalSpots: {
    type: Number,
    required: true,
    trem: true,
  },
  joined: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
  },
  startTime: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Matches ||
  mongoose.model("Matches", MatchesSchema);
