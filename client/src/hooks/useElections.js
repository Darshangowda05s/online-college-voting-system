import { useState, useEffect, useCallback } from "react";
import { electionAPI } from "../services/api";

export function useElections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await electionAPI.getAll();

      setElections(data.elections || []);
    } catch (e) {
      setError(
        e.response?.data?.message ||
        "Failed to load elections"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const castVote = async (
    electionId,
    candidateId
  ) => {
    const { data } =
      await electionAPI.vote(
        electionId,
        candidateId
      );

    setElections((prev) =>
      prev.map((el) =>
        el._id === electionId
          ? { ...el, hasVoted: true }
          : el
      )
    );

    return data;
  };

  return {
    elections,
    loading,
    error,
    refetch: fetch,
    castVote,
  };
}