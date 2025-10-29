import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../Constants/File";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Footer from "../../Footer";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await axios.post(`${API_URL}/admin/auth/login`, credentials);

      // Success: Error === false
      if (res.data.Error === false) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin");
      } else {
        // Show backend error message
        setError(res.data.Error || "Login failed");
      }
    } catch (err) {
      // Handle network or server errors
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.Error || "Invalid credentials");
      } else if (err.request) {
        // No response (network issue)
        setError("Network error. Please check your connection.");
      } else {
        // Other errors
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-md w-full">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-3 border border-red-200">
              <AlertCircle className="w-6 h-6" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Login
            </button>
          </form>

          {/* <p className="text-sm text-gray-500 mt-6 text-center">
          Hint:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            admin / admin123
          </code>
        </p> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;
