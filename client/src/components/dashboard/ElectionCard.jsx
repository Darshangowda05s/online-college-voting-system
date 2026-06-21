import StatusBadge from '../common/StatusBadge';
import Countdown from '../common/Countdown';
import { formatDate, timeUntilStart } from '../../utils/helpers';

export default function ElectionCard({ election, onVote, onViewResults, onRefetch }) {
  const { status, hasVoted, title, description, candidates, startTime, endTime, totalVoters } = election;

  return (
    <div className={`election-card ${status}`}>
      <div className="card-header">
        <StatusBadge status={status} />
        {hasVoted && <span className="voted-tag">✔ Voted</span>}
      </div>

      <h3 className="card-title">{title}</h3>
      {description && <p className="card-desc">{description}</p>}

      <div className="card-meta">
        <span>{candidates.length} candidate{candidates.length !== 1 ? 's' : ''}</span>
        {totalVoters > 0 && <span>{totalVoters} vote{totalVoters !== 1 ? 's' : ''} cast</span>}
      </div>

      <div className="card-time">
        {status === 'active' && (
          <Countdown targetTime={endTime} label="Ends in" onExpire={onRefetch} />
        )}
        {status === 'scheduled' && (
          <p className="time-info">📅 {timeUntilStart(startTime)}</p>
        )}
        {status === 'ended' && (
          <p className="time-info">🏁 Ended {formatDate(endTime)}</p>
        )}
      </div>

      <div className="card-actions">
        {status === 'active' && !hasVoted && (
          <button className="btn-primary" onClick={() => onVote(election)}>
            Vote Now
          </button>
        )}
        {status === 'active' && hasVoted && (
          <p className="already-voted">Your vote is recorded ✔</p>
        )}
        {status === 'scheduled' && (
          <button className="btn-secondary" disabled>
            Voting opens {formatDate(startTime)}
          </button>
        )}
        {status === 'ended' && (
          <button className="btn-secondary" onClick={() => onViewResults(election)}>
            View Results
          </button>
        )}
      </div>
    </div>
  );
}