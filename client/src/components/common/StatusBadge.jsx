export default function StatusBadge({ status }) {
  const map = {
    active: { label: 'Live', cls: 'badge-active' },
    scheduled: { label: 'Upcoming', cls: 'badge-scheduled' },
    ended: { label: 'Ended', cls: 'badge-ended' },
  };
  const { label, cls } = map[status] || map.ended;
  return (
    <span className={`badge ${cls}`}>
      {status === 'active' && <span className="pulse-dot" />}
      {label}
    </span>
  );
}