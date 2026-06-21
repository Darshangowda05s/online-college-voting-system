import { useState, useEffect } from 'react';

function pad(n) { return String(n).padStart(2, '0'); }

export default function Countdown({ targetTime, label = 'Ends in', onExpire }) {
  const [diff, setDiff] = useState(new Date(targetTime) - new Date());

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date(targetTime) - new Date();
      setDiff(d);
      if (d <= 0) { clearInterval(id); onExpire?.(); }
    }, 1000);
    return () => clearInterval(id);
  }, [targetTime, onExpire]);

  if (diff <= 0) return <span className="countdown expired">Closed</span>;

  const totalSec = Math.floor(diff / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const d = Math.floor(h / 24);
  const displayH = h % 24;

  return (
    <div className="countdown">
      <span className="countdown-label">{label}</span>
      <div className="countdown-units">
        {d > 0 && <><span className="countdown-unit"><strong>{pad(d)}</strong><small>d</small></span><span className="sep">:</span></>}
        <span className="countdown-unit"><strong>{pad(displayH)}</strong><small>h</small></span>
        <span className="sep">:</span>
        <span className="countdown-unit"><strong>{pad(m)}</strong><small>m</small></span>
        <span className="sep">:</span>
        <span className="countdown-unit"><strong>{pad(s)}</strong><small>s</small></span>
      </div>
    </div>
  );
}