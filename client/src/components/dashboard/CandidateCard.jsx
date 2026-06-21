import { getInitials } from '../../utils/helpers';

export default function CandidateCard({ candidate, selected, onSelect, disabled }) {
  return (
    <button
      className={`candidate-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && onSelect(candidate._id)}
      disabled={disabled}
    >
      <div className="candidate-avatar">
        {candidate.photo ? (
          <img src={candidate.photo} alt={candidate.name} />
        ) : (
          <div className="avatar-placeholder">{getInitials(candidate.name)}</div>
        )}
        {selected && (
          <div className="check-overlay">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <p className="candidate-name">{candidate.name}</p>
      {candidate.bio && <p className="candidate-bio">{candidate.bio}</p>}
    </button>
  );
}