import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useElections } from "../hooks/useElections";

import Navbar from "../components/common/Navbar";
import StatsBar from "../components/dashboard/StatsBar";
import ElectionCard from "../components/dashboard/ElectionCard";
import VoteModal from "../components/dashboard/VoteModal";
import ResultsModal from "../components/dashboard/ResultsModal";

const TABS = ["all", "active", "scheduled", "ended"];

export default function StudentDashboard() {
  const { user } = useAuth();

  const {
    elections,
    loading,
    error,
    refetch,
    castVote,
  } = useElections();

  const [tab, setTab] = useState("all");
  const [voteTarget, setVoteTarget] = useState(null);
  const [resultsTarget, setResultsTarget] = useState(null);

  const filtered =
    tab === "all"
      ? elections
      : elections.filter((e) => e.status === tab);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard">
        <div className="greeting">
          <div>
            <h1>
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="greeting-sub">
              Your voice shapes the future.
            </p>
          </div>
        </div>

        {!loading && elections.length > 0 && (
          <StatsBar elections={elections} />
        )}

        <div className="tab-bar">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <p className="loading-text">
            Loading elections...
          </p>
        )}

        {error && (
          <p className="loading-text">
            {error}
          </p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="elections-grid">
            {filtered.map((el) => (
              <ElectionCard
                key={el._id}
                election={el}
                onVote={setVoteTarget}
                onViewResults={setResultsTarget}
                onRefetch={refetch}
              />
            ))}
          </div>
        )}
      </main>

      {voteTarget && (
        <VoteModal
          election={voteTarget}
          onClose={() => setVoteTarget(null)}
          onVote={castVote}
        />
      )}

      {resultsTarget && (
        <ResultsModal
          election={resultsTarget}
          onClose={() => setResultsTarget(null)}
        />
      )}
    </div>
  );
}