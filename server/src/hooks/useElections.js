import { useState, useEffect, useCallback } from "react";
import { electionAPI } from "../services/api";

export function useElections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchElections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await electionAPI.getAll();

      setElections(data.elections || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load elections"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchElections();
  }, [fetchElections]);

  const castVote = async (electionId, candidateId) => {
    const { data } = await electionAPI.vote(
      electionId,
      candidateId
    );

    setElections((prev) =>
      prev.map((election) =>
        election._id === electionId
          ? {
              ...election,
              hasVoted: true,
            }
          : election
      )
    );

    return data;
  };

  return {
    elections,
    loading,
    error,
    refetch: fetchElections,
    castVote,
  };
}