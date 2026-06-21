import { useState } from 'react';
import CandidateCard from './CandidateCard';

export default function VoteModal({ election, onClose, onVote }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState('pick'); // pick | confirm | success | error
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onVote(election._id, selected);
      setStep('success');
    } catch (e) {
      setMessage(e.response?.data?.message || 'Something went wrong. Try again.');
      setStep('error');
    } finally {
      setLoading(false);
    }
  }

  const selectedCandidate = election.candidates.find((c) => c._id === selected);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {step === 'pick' && (
          <>
            <h2 className="modal-title">Cast Your Vote</h2>
            <p className="modal-subtitle">{election.title}</p>
            <p className="modal-hint">Select one candidate to continue.</p>
            <div className="candidates-grid">
              {election.candidates.map((c) => (
                <CandidateCard
                  key={c._id}
                  candidate={c}
                  selected={selected === c._id}
                  onSelect={setSelected}
                />
              ))}
            </div>
            <button
              className="btn-primary full"
              disabled={!selected}
              onClick={() => setStep('confirm')}
            >
              Continue →
            </button>
          </>
        )}

        {step === 'confirm' && (
          <>
            <h2 className="modal-title">Confirm Your Vote</h2>
            <p className="modal-subtitle">{election.title}</p>
            <div className="confirm-box">
              <p className="confirm-label">You're voting for</p>
              <p className="confirm-candidate">{selectedCandidate?.name}</p>
              <p className="confirm-warning">⚠️ This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setStep('pick')} disabled={loading}>
                ← Change
              </button>
              <button className="btn-primary" onClick={handleConfirm} disabled={loading}>
                {loading ? 'Submitting…' : 'Confirm Vote'}
              </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="modal-result success">
            <div className="result-icon">🎉</div>
            <h2>Vote Recorded!</h2>
            <p>Your vote for <strong>{selectedCandidate?.name}</strong> has been cast in <em>{election.title}</em>.</p>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        )}

        {step === 'error' && (
          <div className="modal-result error">
            <div className="result-icon">⚠️</div>
            <h2>Something went wrong</h2>
            <p>{message}</p>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}