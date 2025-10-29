import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SelectionPage from "./Pages/SelectionPage";
import AdminLogin from "./Pages/Admin/Auth/AdminLoginPage";
import AdminDashboard from "./Pages/Admin/AdminDashboardPage";
import StudentView from "./Pages/Student/StudentViewPage";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectionPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/student/:studentName" element={<StudentView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
