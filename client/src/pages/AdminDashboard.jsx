import { useRef, useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import CreateElectionModal from "../components/admin/CreateElectionModal";

import DashboardHome from "./admin/DashboardHome";
import Elections from "./admin/Elections";
import Users from "./admin/Users";
import Results from "./admin/Results";
import AuditLogs from "./admin/AuditLogs";
import Settings from "./admin/Settings";

import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [showElectionModal, setShowElectionModal] = useState(false);
  const [editingElection, setEditingElection] = useState(null);

  const electionsRef = useRef(null);

  const { logout } = useAuth();

  function openCreateElection() {
    setShowElectionModal(true);
  }

  function closeCreateElection() {
    setShowElectionModal(false);
  }

  function handleElectionCreated() {
    setShowElectionModal(false);

    // Refresh the Elections page instantly
    electionsRef.current?.refresh();
  }



  const openEditElection = (election) => {
    setEditingElection(election);
  };

  const closeEditElection = () => {
    setEditingElection(null);
  };

  let content;

  switch (active) {
    case "dashboard":
      content = (
        <DashboardHome
          openCreateElection={openCreateElection}
        />
      );
      break;

    case "elections":
      content = (
        <Elections
            openCreateElection={openCreateElection}
            openEditElection={openEditElection}
            ref={electionsRef}
        />
      );
      break;

    case "users":
      content = <Users />;
      break;

    case "results":
      content = <Results />;
      break;

    case "logs":
      content = <AuditLogs />;
      break;

    case "settings":
      content = <Settings />;
      break;

    default:
      content = (
        <DashboardHome
          openCreateElection={openCreateElection}
        />
      );
  }

  return (
    <>
      <div className="admin-layout">
        <Sidebar
          active={active}
          setActive={setActive}
          onLogout={logout}
        />

        <main className="admin-main">
          {content}
        </main>
      </div>

      {showElectionModal && (
        <CreateElectionModal
          onClose={closeCreateElection}
          onCreated={handleElectionCreated}
        />
      )}

      {editingElection && (

        <EditElectionModal
            election={editingElection}
            onClose={closeEditElection}
            onUpdated={() => {

                closeEditElection();

                electionsRef.current?.refresh();

            }}
        />

        )}
    </>
  );
}