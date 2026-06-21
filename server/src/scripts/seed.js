import dotenv from "dotenv";
import mongoose from "mongoose";
import Election from "../models/Election.js";

dotenv.config();

const now = new Date();

const elections = [
  {
    title: "Student President 2025",
    description:
      "Elect your Student President for the upcoming academic year.",
    startTime: new Date(now - 3600_000),
    endTime: new Date(now + 86400_000 * 2),
    totalEligibleVoters: 1200,

    candidates: [
      {
        name: "Ayaan Khan",
        bio: "Final year CSE. Focused on campus technology.",
      },
      {
        name: "Priya Sharma",
        bio: "3rd year EEE. Advocates for student welfare.",
      },
      {
        name: "Rohan Das",
        bio: "3rd year Mechanical. Sports and infrastructure.",
      },
    ],
  },

  {
    title: "General Secretary 2025",
    description:
      "Choose the student who will manage day-to-day affairs.",

    startTime: new Date(now - 7200_000),
    endTime: new Date(now + 86400_000),

    totalEligibleVoters: 1200,

    candidates: [
      {
        name: "Sneha Patel",
        bio: "Organized multiple college events.",
      },
      {
        name: "Vikram Singh",
        bio: "Known for transparent communication.",
      },
    ],
  },

  {
    title: "Cultural Secretary 2025",

    description:
      "Drive the cultural life of the campus.",

    startTime: new Date(now + 86400_000 * 3),
    endTime: new Date(now + 86400_000 * 5),

    totalEligibleVoters: 1200,

    candidates: [
      {
        name: "Meera Nair",
        bio: "Carnatic vocalist and event planner.",
      },
      {
        name: "Arjun Reddy",
        bio: "Street dancer and theatre enthusiast.",
      },
    ],
  },

  {
    title: "Sports Captain 2024",

    description:
      "Inter-college sports captain election.",

    startTime: new Date(now - 86400_000 * 10),
    endTime: new Date(now - 86400_000 * 8),

    totalEligibleVoters: 900,

    candidates: [
      {
        name: "Dev Kapoor",
        bio: "State-level kabaddi player.",
        voteCount: 420,
      },
      {
        name: "Ananya Menon",
        bio: "Athletics champion.",
        voteCount: 310,
      },
      {
        name: "Ravi Teja",
        bio: "Cricket team captain.",
        voteCount: 170,
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Election.deleteMany({});

    await Election.insertMany(elections);

    console.log(
      `✅ Seeded ${elections.length} elections`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();