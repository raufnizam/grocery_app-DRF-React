import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/auth/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import EditProfile from "./components/auth/EditProfile";
import Home from "./components/Home";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/profile" element={<h1>Profile Page</h1>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;