import {
  LayoutDashboard,
  Vote,
  Users,
  BarChart3,
  ClipboardList,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    name: "Elections",
    icon: Vote,
    id: "elections",
  },
  {
    name: "Users",
    icon: Users,
    id: "users",
  },
  {
    name: "Results",
    icon: BarChart3,
    id: "results",
  },
  {
    name: "Audit Logs",
    icon: ClipboardList,
    id: "logs",
  },
  {
    name: "Settings",
    icon: Settings,
    id: "settings",
  },
];

export default function Sidebar({
  active,
  setActive,
  onLogout,
}) {
  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">

        <div className="admin-logo-icon">
          <Shield size={20}/>
        </div>

        <div>

          <h2>VoteHub</h2>

          <span>Admin Panel</span>

        </div>

      </div>

      <nav className="admin-nav">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.id}
              className={`admin-nav-item ${
                active === item.id ? "active" : ""
              }`}
              onClick={() => setActive(item.id)}
            >
              <Icon size={19} />

              <span>{item.name}</span>

            </button>

          );
        })}

      </nav>

      <button
        className="admin-logout"
        onClick={onLogout}
      >
        <LogOut size={18}/>

        <span>Logout</span>

      </button>

    </aside>
  );
}