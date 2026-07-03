export const validateElection = (req, res, next) => {
  try {
    const { title, description, startTime, endTime, candidates, totalEligibleVoters } = req.body;

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a non-empty string",
      });
    }

    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Description is required and must be a non-empty string",
      });
    }

    if (!startTime) {
      return res.status(400).json({
        success: false,
        message: "Start time is required",
      });
    }

    if (!endTime) {
      return res.status(400).json({
        success: false,
        message: "End time is required",
      });
    }

    // Validate date format
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid start time format",
      });
    }

    if (isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid end time format",
      });
    }

    if (startDate >= endDate) {
      return res.status(400).json({
        success: false,
        message: "Start time must be before end time",
      });
    }

    // Validate candidates
    if (!Array.isArray(candidates) || candidates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Candidates must be a non-empty array",
      });
    }

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];

      if (!candidate.name || typeof candidate.name !== "string" || candidate.name.trim() === "") {
        return res.status(400).json({
          success: false,
          message: `Candidate ${i + 1}: name is required and must be a non-empty string`,
        });
      }

      if (!candidate.photo || typeof candidate.photo !== "string" || candidate.photo.trim() === "") {
        return res.status(400).json({
          success: false,
          message: `Candidate ${i + 1}: photo URL is required and must be a non-empty string`,
        });
      }

      if (!candidate.bio || typeof candidate.bio !== "string" || candidate.bio.trim() === "") {
        return res.status(400).json({
          success: false,
          message: `Candidate ${i + 1}: bio is required and must be a non-empty string`,
        });
      }

      if (!candidate.department || typeof candidate.department !== "string" || candidate.department.trim() === "") {
        return res.status(400).json({
          success: false,
          message: `Candidate ${i + 1}: department is required and must be a non-empty string`,
        });
      }

      if (candidate.year === undefined || candidate.year === null) {
        return res.status(400).json({
          success: false,
          message: `Candidate ${i + 1}: year is required`,
        });
      }

      if (!Number.isInteger(candidate.year) || candidate.year < 1 || candidate.year > 4) {
        return res.status(400).json({
          success: false,
          message: `Candidate ${i + 1}: year must be an integer between 1 and 4`,
        });
      }
    }

    // Validate totalEligibleVoters
    if (!totalEligibleVoters) {
      return res.status(400).json({
        success: false,
        message: "Total eligible voters is required",
      });
    }

    if (!Number.isInteger(totalEligibleVoters) || totalEligibleVoters <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total eligible voters must be a positive integer",
      });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }
};
