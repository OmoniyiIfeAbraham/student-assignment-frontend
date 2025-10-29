import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function SelectionPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-md w-full border border-white/20">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Assignment Portal
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Choose your role to begin
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/admin/login")}
              className="w-full py-5 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Admin Login
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  or
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/student/harold")}
              className="w-full py-5 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Harold's Assignments
            </button>

            <button
              onClick={() => navigate("/student/hera")}
              className="w-full py-5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Hera's Assignments
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SelectionPage;
