import { useState, useEffect } from 'react';
import { electionAPI } from '../../services/api';

export default function ResultsModal({ election, onClose }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    electionAPI.results(election._id)
      .then(({ data }) => setResults(data.results))
      .finally(() => setLoading(false));
  }, [election._id]);

  const winner = results?.candidates?.[0];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal results-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Results</h2>
        <p className="modal-subtitle">{election.title}</p>

        {loading && <p className="loading-text">Loading results…</p>}

        {results && (
          <>
            {winner && (
              <div className="winner-banner">
                🏆 <strong>{winner.name}</strong> won with {winner.voteCount} votes ({winner.percentage}%)
              </div>
            )}
            <div className="results-list">
              {results.candidates.map((c, i) => (
                <div key={c._id} className={`result-row ${i === 0 ? 'result-winner' : ''}`}>
                  <span className="result-rank">#{i + 1}</span>
                  <span className="result-name">{c.name}</span>
                  <div className="result-bar-wrap">
                    <div className="result-bar" style={{ width: `${c.percentage}%` }} />
                  </div>
                  <span className="result-pct">{c.percentage}%</span>
                  <span className="result-votes">{c.voteCount}v</span>
                </div>
              ))}
            </div>
            <p className="results-total">Total votes: {results.totalVotes}</p>
          </>
        )}
        <button className="btn-secondary full mt" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}