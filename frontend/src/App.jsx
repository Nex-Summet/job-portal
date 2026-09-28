import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Jobs from "./Jobs";
import MyApplications from "./MyApplications";
import AdminJobs from "./AdminJobs";
import AdminApplications from "./AdminApplications";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import JobDetails from "./JobDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/jobs" replace />}
        />

        {/* Public routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
  path="/jobs/:id"
  element={<JobDetails />}
/>

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <AdminJobs />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <AdminApplications />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;