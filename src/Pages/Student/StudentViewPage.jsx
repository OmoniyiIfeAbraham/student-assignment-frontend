import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../Constants/File";
import { BookOpen, Calendar, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Footer from "../Footer";
import axios from "axios";
import MarkdownTOC from "../../Components/MarkdownTOC";

function StudentView() {
  const { studentName } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudentAssignments(studentName);
  }, [studentName]);

  const fetchStudentAssignments = async (student) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/assignments/${student}`);
      if (res.data.Error === false) {
        setAssignments(res.data.assignments || []);
      } else {
        setError(res.data.Error || "Failed to fetch assignments");
        alert(res.data.Error || "Failed to fetch assignments");
      }
    } catch (err) {
      const errMsg = err.response?.data?.Error || "Network error. Please try again.";
      setError(errMsg);
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const color = studentName === "harold" ? "emerald" : "purple";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white p-5 shadow-xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {studentName.charAt(0).toUpperCase() + studentName.slice(1)}'s Assignments
          </h1>
          <button
            onClick={() => navigate("/")}
            className={`bg-${color}-700 hover:bg-${color}-800 px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-md font-semibold outline`}
          >
            Back to Home
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        {/* 🔄 Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-600">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-600" />
            <p className="text-lg font-semibold">Fetching assignments...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-300 text-red-700 p-6 rounded-xl text-center font-medium">
            {error}
          </div>
        ) : assignments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-16 text-center">
            <BookOpen className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">No Assignments Yet</h2>
            <p className="text-gray-600 text-lg">Check back later for new assignments.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {assignments.map((assignment) => (
              <div
                key={assignment._id}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all border border-gray-100"
              >
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{assignment.title}</h3>

                <div className="flex gap-6">
                  <div className="flex-1 prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <ReactMarkdown>{assignment.content}</ReactMarkdown>
                  </div>
                  {assignment.content.length > 200 && (
                    <div className="hidden lg:block w-64">
                      <MarkdownTOC markdown={assignment.content} />
                    </div>
                  )}
                </div>

                <div className="border-t pt-6 mt-8">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Assigned: {new Date(assignment.createdAt).toLocaleDateString()}
                    </div>
                    {assignment.dueDate && (
                      <div className="flex items-center gap-2 font-bold text-orange-600">
                        <Calendar className="w-5 h-5" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default StudentView;