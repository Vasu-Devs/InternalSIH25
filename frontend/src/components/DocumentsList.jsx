// src/components/DocumentsList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  LayoutDashboard,
  MessageCircle,
  FileText,
  Trash2,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const API_BASE = "http://127.0.0.1:8000";

  // Fetch documents from backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${API_BASE}/documents`);
        if (response.ok) {
          const data = await response.json();
          setDocuments(data);
        } else {
          console.error("Failed to fetch documents");
          // For now, use mock data if API fails
          setDocuments(mockDocuments);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        // Use mock data as fallback
        setDocuments(mockDocuments);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Mock data (fallback if API is not available)
  const mockDocuments = [
    {
      id: 1,
      name: "Hostel Rules 2024.docx",
      date: "2025-09-01",
      time: "10:34 AM",
      size: "1.2 MB",
      status: "verified",
    },
    {
      id: 2,
      name: "Exam_policy_2025.pdf",
      date: "2025-09-01",
      time: "10:34 AM",
      size: "2.4 MB",
      status: "verified",
    },
    {
      id: 3,
      name: "Fee_structure_2025.pdf",
      date: "2025-09-01",
      time: "10:34 AM",
      size: "1.8 MB",
      status: "processing",
    },
    {
      id: 4,
      name: "Library Late Fee Policy.pdf",
      date: "2025-09-01",
      time: "10:34 AM",
      size: "1.2 MB",
      status: "verified",
    },
    {
      id: 5,
      name: "Anti-Ragging Guidelines.pdf",
      date: "2025-09-01",
      time: "10:34 AM",
      size: "3.1 MB",
      status: "verified",
    },
    {
      id: 6,
      name: "Scholarship_guidelines.pdf",
      date: "2025-09-01",
      time: "10:34 AM",
      size: "2.2 MB",
      status: "processing",
    },
  ];

  // Navigation functions
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userRegNo");
    navigate("/");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoToChat = () => {
    navigate("/chat");
  };

  const handleGoToAnalytics = () => {
    navigate("/analytics");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete document function
  const handleDelete = async (documentId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        const response = await fetch(`${API_BASE}/documents/${documentId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setDocuments(documents.filter((doc) => doc.id !== documentId));
        } else {
          alert("Failed to delete document");
        }
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Error deleting document");
      }
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} />
            Verified
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} />
            Processing
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle size={12} />
            Failed
          </span>
        );
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Document Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage all uploaded policy documents and files
            </p>
          </div>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  {localStorage.getItem("userRegNo") || "Admin"}
                </div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
                <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                  {localStorage.getItem("userRegNo") || "Admin"}
                </div>
                <button
                  onClick={handleGoToDashboard}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Go to Dashboard
                </button>
                <button
                  onClick={handleGoToAnalytics}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <FileText size={16} />
                  Go to Analytics
                </button>
                <button
                  onClick={handleGoToChat}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <MessageCircle size={16} />
                  Go to Chat
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              All Uploaded Documents
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {documents.length} documents
            </p>
          </div>

          {/* Documents Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors">
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No documents
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload some documents to get started.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DocumentsList;
