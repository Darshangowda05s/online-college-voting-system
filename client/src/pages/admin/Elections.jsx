import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import { electionAPI } from "../../services/api";

const Elections = forwardRef(function Elections(
  { openCreateElection,
    openEditElection,
   },
  ref
) {
  const [search, setSearch] = useState("");

  const [elections, setElections] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function fetchElections() {
    try {
      setLoading(true);

      const { data } = await electionAPI.getAll();

      setElections(data.elections);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load elections.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchElections();
  }, []);

  // Expose refresh() to AdminDashboard
  useImperativeHandle(ref, () => ({
    refresh: fetchElections,
  }));

  const filtered = elections.filter((election) =>
    election.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">

      <div className="page-header">

        <div>
          <h1>Elections</h1>

          <p>
            Manage all elections from one place.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={openCreateElection}
        >
          + New Election
        </button>

      </div>

      <div className="toolbar">

        <input
          type="text"
          placeholder="Search elections..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="election-list">

        {loading && (
          <p>Loading elections...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {!loading &&
          !error &&
          filtered.length === 0 && (
            <p>No elections found.</p>
          )}

        {!loading &&
          !error &&
          filtered.map((election) => (

            <div
              key={election._id}
              className="election-admin-card"
            >

              <div>

                <h2>{election.title}</h2>

                <span
                  className={`status ${election.status}`}
                >
                  {election.status}
                </span>

                <p>
                  Candidates :{" "}
                  {election.candidates.length}
                </p>

                <p>
                  Votes :{" "}
                  {election.totalVoters}
                </p>

                <p>
                  Ends :{" "}
                  {new Date(
                    election.endTime
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="card-actions">

                <button
                  onClick={() => openEditElection(election)}
                >
                  Edit
                </button>

                <button>
                  Results
                </button>

                <button className="danger">
                  Delete
                </button>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
});

export default Elections;