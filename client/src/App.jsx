import Login from "./pages/Login";

import {
  useAuth
}
from "./context/AuthContext";

import AdminDashboard
from "./pages/AdminDashboard";

import StudentDashboard
from "./pages/StudentDashboard";

function App() {

  const {
    user,
    loading
  } = useAuth();

  if (loading)
    return <h1>Loading...</h1>;

  if (!user)
    return <Login />;

  if (user.role === "admin")
    return <AdminDashboard />;

  return <StudentDashboard />;
}

export default App;