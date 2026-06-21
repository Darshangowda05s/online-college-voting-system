import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    default: ""
  },

  year: {
    type: String,
    default: ""
  },

  photo: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  voteCount: {
    type: Number,
    default: 0,
  },
});

const electionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    candidates: [candidateSchema],

    status: {
      type: String,
      enum: [
        "scheduled",
        "active",
        "ended",
      ],
      default: "scheduled",
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    totalEligibleVoters: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

electionSchema.methods.computeStatus =
  function () {
    const now = new Date();

    if (now < this.startTime)
      return "scheduled";

    if (now > this.endTime)
      return "ended";

    return "active";
  };

export default mongoose.model(
  "Election",
  electionSchema
);