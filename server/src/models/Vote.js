import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },

    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    votedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// One vote per user per election
voteSchema.index(
  {
    election: 1,
    voter: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Vote",
  voteSchema
);