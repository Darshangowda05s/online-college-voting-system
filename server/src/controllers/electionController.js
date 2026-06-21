import Election from "../models/Election.js";
import Vote from "../models/Vote.js";

// GET /api/elections
export const getAllElections = async (req, res) => {
  try {
    const userId = req.user.userId;

    const elections = await Election.find().sort({
      startTime: 1,
    });

    const votedElectionIds = await Vote.find({
      voter: userId,
    }).distinct("election");

    const votedSet = new Set(
      votedElectionIds.map(String)
    );

    const data = elections.map((el) => {
      const status = el.computeStatus();

      return {
        _id: el._id,
        title: el.title,
        description: el.description,
        status,
        startTime: el.startTime,
        endTime: el.endTime,
        totalVoters: el.voters.length,
        totalEligibleVoters:
          el.totalEligibleVoters,
        hasVoted: votedSet.has(
          String(el._id)
        ),

        candidates: el.candidates.map(
          (c) => ({
            _id: c._id,
            name: c.name,
            photo: c.photo,
            bio: c.bio,
            department: c.department,
            year: c.year,

            ...(status === "ended"
              ? {
                voteCount:
                  c.voteCount,
              }
              : {}),
          })
        ),
      };
    });

    res.json({
      success: true,
      elections: data,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET /api/elections/:id
export const getElection = async (
  req,
  res
) => {
  try {
    const userId = req.user.userId;

    const election =
      await Election.findById(
        req.params.id
      );

    if (!election) {
      return res.status(404).json({
        success: false,
        message:
          "Election not found",
      });
    }

    const status =
      election.computeStatus();

    const vote =
      await Vote.findOne({
        election: election._id,
        voter: userId,
      });

    res.json({
      success: true,

      election: {
        _id: election._id,
        title: election.title,
        description:
          election.description,
        status,
        startTime:
          election.startTime,
        endTime: election.endTime,
        totalVoters:
          election.voters.length,
        totalEligibleVoters:
          election.totalEligibleVoters,

        hasVoted: !!vote,

        votedCandidateId: vote
          ? vote.candidateId
          : null,

        candidates:
          election.candidates.map(
            (c) => ({
              _id: c._id,
              name: c.name,
              photo: c.photo,
              bio: c.bio,
              department:
                c.department,
              year: c.year,

              ...(status ===
                "ended"
                ? {
                  voteCount:
                    c.voteCount,
                }
                : {}),
            })
          ),
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// POST /api/elections/:id/vote
export const castVote = async (
  req,
  res
) => {
  try {
    const userId =
      req.user.userId;

    const { candidateId } =
      req.body;

    const election =
      await Election.findById(
        req.params.id
      );

    if (!election) {
      return res.status(404).json({
        success: false,
        message:
          "Election not found",
      });
    }

    const status =
      election.computeStatus();

    if (status !== "active") {
      return res.status(400).json({
        success: false,
        message:
          "Voting is not open for this election.",
      });
    }

    const candidate =
      election.candidates.id(
        candidateId
      );

    if (!candidate) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid candidate.",
      });
    }

    try {
      await Vote.create({
        election: election._id,
        voter: userId,
        candidateId,
      });
    } catch (dupErr) {
      if (dupErr.code === 11000) {
        return res.status(409).json({
          success: false,
          message:
            "You have already voted in this election.",
        });
      }

      throw dupErr;
    }

    await Election.updateOne(
      {
        _id: election._id,
        "candidates._id":
          candidateId,
      },
      {
        $inc: {
          "candidates.$.voteCount":
            1,
        },

        $addToSet: {
          voters: userId,
        },
      }
    );

    res.json({
      success: true,
      message:
        "Vote cast successfully!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET /api/elections/:id/results
export const getResults = async (
  req,
  res
) => {
  try {
    const election =
      await Election.findById(
        req.params.id
      );

    if (!election) {
      return res.status(404).json({
        success: false,
        message:
          "Election not found",
      });
    }

    const status =
      election.computeStatus();

    if (status !== "ended") {
      return res.status(403).json({
        success: false,
        message:
          "Results available only after election ends.",
      });
    }

    const totalVotes =
      election.candidates.reduce(
        (sum, candidate) =>
          sum +
          candidate.voteCount,
        0
      );

    res.json({
      success: true,

      results: {
        title: election.title,
        endTime:
          election.endTime,
        totalVotes,

        candidates:
          election.candidates
            .map((c) => ({
              _id: c._id,
              name: c.name,
              photo: c.photo,
              voteCount:
                c.voteCount,

              percentage:
                totalVotes > 0
                  ? (
                    (c.voteCount /
                      totalVotes) *
                    100
                  ).toFixed(1)
                  : 0,
            }))
            .sort(
              (a, b) =>
                b.voteCount -
                a.voteCount
            ),
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ADMIN - POST /api/elections
export const createElection =
  async (req, res) => {
    try {
      const election =
        await Election.create(
          req.body
        );

      res.status(201).json({
        success: true,
        election,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: "Failed to create election",
      });
    }
  };



// ADMIN - PUT /api/elections/:id
export const updateElection =
  async (req, res) => {
    try {
      const election =
        await Election.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      if (!election) {
        return res.status(404).json({
          success: false,
          message:
            "Election not found",
        });
      }

      res.json({
        success: true,
        election,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: "Failed to create election",
      });
    }
  };

// ADMIN - DELETE /api/elections/:id
export const deleteElection =
  async (req, res) => {
    try {
      const election =
        await Election.findByIdAndDelete(
          req.params.id
        );

      if (!election) {
        return res.status(404).json({
          success: false,
          message:
            "Election not found",
        });
      }

      res.json({
        success: true,
        message:
          "Election deleted successfully",
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: "Failed to create election",
      });
    }
  };