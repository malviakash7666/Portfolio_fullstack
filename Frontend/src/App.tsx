import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
// import Dashboard from "./pages/admin/Dashboard";
import Portfolio from "./pages/public/Portfolio";
// import ProtectedRoute from "./components/ProtectedRoute";
// 
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public Home */}
        <Route path="/" element={<Home />} />

        {/* 🌍 Public Portfolio */}
        <Route path="/user/:username" element={<Portfolio />} />

        {/* 🔐 Protected Dashboard */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;