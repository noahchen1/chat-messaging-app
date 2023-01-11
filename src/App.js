import Login from "./components/Login";
import Register from "./components/Register";
import CheckAuth from "./components/CheckAuth";
import Dashboard from "./components/Dashbaord";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<CheckAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  );
}

export default App;
