export default function StatsBar({ elections }) {
  const active = elections.filter((e) => e.status === 'active').length;
  const upcoming = elections.filter((e) => e.status === 'scheduled').length;
  const votedIn = elections.filter((e) => e.hasVoted).length;
  const total = elections.length;

  const stats = [
    { label: 'Active Elections', value: active, icon: '🗳️' },
    { label: 'Upcoming', value: upcoming, icon: '📅' },
    { label: 'Your Votes Cast', value: votedIn, icon: '✅' },
    { label: 'Total Elections', value: total, icon: '📊' },
  ];

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <span className="stat-icon">{s.icon}</span>
          <div>
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}