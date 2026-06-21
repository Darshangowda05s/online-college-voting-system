import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="var(--accent)" />
          <path d="M8 14l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>VoteHub</span>
      </div>

      <div className="navbar-right" ref={ref}>
        <button className="profile-trigger" onClick={() => setOpen((o) => !o)} aria-label="Profile menu">
          {user?.photo ? (
            <img src={user.photo} alt={user.name} className="avatar-img" />
          ) : (
            <div className="avatar-initials">{getInitials(user?.name || 'U')}</div>
          )}
          <span className="profile-name">{user?.name?.split(' ')[0]}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`chevron ${open ? 'open' : ''}`}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {open && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="avatar-img lg" />
              ) : (
                <div className="avatar-initials lg">{getInitials(user?.name || 'U')}</div>
              )}
              <div>
                <p className="dropdown-name">{user?.name}</p>
                <p className="dropdown-email">{user?.email}</p>
              </div>
            </div>
            <hr className="dropdown-divider" />
            <button className="dropdown-item" onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}