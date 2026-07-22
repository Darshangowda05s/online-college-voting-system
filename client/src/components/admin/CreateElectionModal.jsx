import { useState } from "react";
import { electionAPI } from "../../services/api";

export default function CreateElectionModal({
  onClose,
  onCreated,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    totalEligibleVoters: "",

    candidates: [
      {
        name: "",
        department: "",
        year: "",
        photo: "",
        bio: "",
      },
      {
        name: "",
        department: "",
        year: "",
        photo: "",
        bio: "",
      },
    ],
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleCandidateChange(index, field, value) {
    const updated = [...form.candidates];

    updated[index][field] = value;

    setForm({
      ...form,
      candidates: updated,
    });
  }

  function addCandidate() {
    setForm({
      ...form,

      candidates: [
        ...form.candidates,
        {
          name: "",
          department: "",
          year: "",
          photo: "",
          bio: "",
        },
      ],
    });
  }

  function removeCandidate(index) {
    if (form.candidates.length <= 2) return;

    const updated = form.candidates.filter(
      (_, i) => i !== index
    );

    setForm({
      ...form,
      candidates: updated,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await electionAPI.create(form);

      if (onCreated) {
        onCreated();
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to create election."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">

      <div className="create-election-modal">

        <div className="modal-header">

          <h2>Create Election</h2>

          <button
            type="button"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Election Title</label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Start Time</label>

              <input
                type="datetime-local"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>End Time</label>

              <input
                type="datetime-local"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="form-group">

            <label>Total Eligible Voters</label>

            <input
              type="number"
              name="totalEligibleVoters"
              value={form.totalEligibleVoters}
              onChange={handleChange}
            />

          </div>

          <hr />

          <h3>Candidates</h3>

          {form.candidates.map((candidate, index) => (

            <div
              className="candidate-box"
              key={index}
            >

              <div className="candidate-header">

                <h4>
                  Candidate {index + 1}
                </h4>

                {form.candidates.length > 2 && (

                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() =>
                      removeCandidate(index)
                    }
                  >
                    Remove
                  </button>

                )}

              </div>

              <input
                placeholder="Name"
                value={candidate.name}
                onChange={(e) =>
                  handleCandidateChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Department"
                value={candidate.department}
                onChange={(e) =>
                  handleCandidateChange(
                    index,
                    "department",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Year"
                value={candidate.year}
                onChange={(e) =>
                  handleCandidateChange(
                    index,
                    "year",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Photo URL"
                value={candidate.photo}
                onChange={(e) =>
                  handleCandidateChange(
                    index,
                    "photo",
                    e.target.value
                  )
                }
              />

              <textarea
                placeholder="Bio"
                value={candidate.bio}
                onChange={(e) =>
                  handleCandidateChange(
                    index,
                    "bio",
                    e.target.value
                  )
                }
              />

            </div>

          ))}

          <button
            type="button"
            className="secondary-btn"
            onClick={addCandidate}
          >
            + Add Candidate
          </button>

          <div className="modal-footer">

            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Election"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}