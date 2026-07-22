export default function QuickActions({
  openCreateElection,
}) {
  return (
    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="quick-buttons">

        <button onClick={openCreateElection}>
          Create Election
        </button>

        <button>
          View Results
        </button>

        <button>
          Audit Logs
        </button>

      </div>

    </div>
  );
}