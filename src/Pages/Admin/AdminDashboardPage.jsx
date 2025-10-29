import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Constants/File";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Edit,
  LogOut,
  PlusCircle,
  Trash2,
} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ReactMarkdown from "react-markdown";
import Footer from "../Footer";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "harold",
    title: "",
    content: "",
    dueDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
      navigate("/admin/login");
    } else {
      fetchAllAssignments();
    }
  }, [navigate]);

  const fetchAllAssignments = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/assignments`);
      if (res.data.Error === false) {
        setAssignments(res.data.assignments || []);
      } else {
        setError(res.data.Error || "Failed to fetch assignments");
      }
    } catch (err) {
      setError(err.response?.data?.Error || "Network error. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let res;
      if (editingId) {
        res = await axios.put(
          `${API_URL}/admin/assignments/${editingId}`,
          formData
        );
      } else {
        res = await axios.post(`${API_URL}/admin/assignments`, formData);
      }

      if (res.data.Error === false) {
        fetchAllAssignments();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          studentName: "harold",
          title: "",
          content: "",
          dueDate: "",
        });
      } else {
        setError(res.data.Error || "Failed to save assignment");
      }
    } catch (err) {
      setError(
        err.response?.data?.Error || "Failed to save. Please try again."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      const res = await axios.delete(`${API_URL}/admin/assignments/${id}`);
      if (res.data.Error === false) {
        fetchAllAssignments();
      } else {
        setError(res.data.Error || "Failed to delete");
      }
    } catch (err) {
      setError(err.response?.data?.Error || "Delete failed. Please try again.");
    }
  };

  const startEdit = (assignment) => {
    setEditingId(assignment._id);
    setFormData({
      studentName: assignment.studentName,
      title: assignment.title,
      content: assignment.content,
      dueDate: assignment.dueDate ? assignment.dueDate.split("T")[0] : "",
    });
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-5 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-indigo-700 px-6 py-3 rounded-xl hover:bg-indigo-800 transition-all transform hover:scale-105 shadow-md"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
            <AlertCircle className="w-6 h-6" />
            {error}
          </div>
        )}

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
          >
            <PlusCircle className="w-6 h-6" />
            Create New Assignment
          </button>
        )}

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingId ? "Edit" : "Create"} Assignment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Student
                  </label>
                  <select
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData({ ...formData, studentName: e.target.value })
                    }
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
                  >
                    <option value="harold">Harold</option>
                    <option value="hera">Hera</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Assignment Content (Markdown)
                </label>
                <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                  <div data-color-mode="light">
                    <MDEditor
                      value={formData.content}
                      onChange={(val) =>
                        setFormData({ ...formData, content: val || "" })
                      }
                      height={400}
                      preview="live"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all font-bold shadow-md"
                >
                  {editingId ? "Update" : "Create"} Assignment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      studentName: "harold",
                      title: "",
                      content: "",
                      dueDate: "",
                    });
                  }}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">All Assignments</h2>
          {assignments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <BookOpen className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No assignments yet. Create one to get started!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {assignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                          assignment.studentName === "harold"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {assignment.studentName.charAt(0).toUpperCase() +
                          assignment.studentName.slice(1)}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-800 mt-3">
                        {assignment.title}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(assignment)}
                        className="p-3 text-indigo-600 hover:bg-indigo-50 rounded-xl transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(assignment._id)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none text-gray-700 mb-4">
                    <ReactMarkdown>{assignment.content}</ReactMarkdown>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Created:{" "}
                      {new Date(assignment.createdAt).toLocaleDateString()}
                    </div>
                    {assignment.dueDate && (
                      <div className="flex items-center gap-2 font-semibold text-orange-600">
                        <Calendar className="w-4 h-4" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
