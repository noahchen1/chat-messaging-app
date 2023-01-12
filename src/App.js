import Login from "./components/Login";
import Register from "./components/Register";
import CheckAuth from "./components/CheckAuth";
import Dashboard from "./components/Dashbaord";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { rememberUser } = useAuth();

  const handleUnload = () => {
    if (!rememberUser) localStorage.clear();
  }

  useEffect(() => {
    window.onbeforeunload = () => handleUnload();
  }, [rememberUser]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<PersistLogin />}>
        <Route path="/" element={<CheckAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
