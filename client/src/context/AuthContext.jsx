import { createContext, useContext, useState, useEffect } from "react";
import { userAPI } from "../services/api";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Don't check localStorage — just try the /me call
  // If cookie exists, it works. If not, user is null.
  userAPI.getProfile()
    .then(({ data }) => setUser(data.user))
    .catch(() => setUser(null))   // cookie absent or expired
    .finally(() => setLoading(false));
}, []);

const logout = () => {
  // Call your logout endpoint to clear the httpOnly cookie
  api.post('/auth/logout').finally(() => {
    setUser(null);
    window.location.href = '/login';
  });
};



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);