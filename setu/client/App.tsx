import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PlaceholderPage from "@/components/PlaceholderPage";
import { useEffect } from "react";
import Header2 from "./components/layout/Header2";
import LoginSignup from "./pages/Login";
import ProfileForm from "./pages/ProfileForm.tsx";

// Student page imports
import StudentDashboard from "./pages/StudentDashboard.tsx";
import StudentProfile from "./pages/Profile.tsx";
import StudentDocuments from "./pages/StudentDocuments.tsx";
import StudentSettings from "./pages/StudentSettings.jsx";
import StudentSupport from "./pages/StudentSupport.tsx";

// Company page imports
import CompanyRegisterPage from "./pages/CompanyRegisterPage";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyApplicantsPage from "./pages/CompanyApplicantsPage";
import CompanyPortal from "./pages/CompanyPortal.tsx";
import CompanyLogin from "./pages/CompanyLogin.tsx";

import AvailableInternships from "./InternshipList.tsx";
import MyApplications from "./InternshipApplication.tsx";
import Results from "./InternshipResult.tsx";
import Resources from "./InternshipResources.tsx";
import FAQs from "./InternshipFAQs.tsx";
import Reports from "./InternshipReports.tsx";

// NEW: Streamlit Dashboard Component
import StreamlitDashboard from "./pages/StreamlitDashboard";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Header2 />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/profile-form" element={<ProfileForm />} />
              <Route
                path="/apply"
                element={
                  <PlaceholderPage
                    title="Application Portal"
                    description="Start your application for the PM Internship Scheme. We will build this flow next."
                  />
                }
              />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/docs" element={<StudentDocuments />} />
              <Route path="/student/settings" element={<StudentSettings />} />
              <Route path="/student/support" element={<StudentSupport />} />

              {/* Company Routes */}
              <Route path="/company/join" element={<CompanyPortal />} />
              <Route path="/company/register" element={<CompanyRegisterPage />} />
              <Route path="/company/login" element={<CompanyLogin />} />
              <Route path="/company/dashboard" element={<CompanyDashboard />} />
              <Route
                path="/company/dashboard/:internshipId/applicants"
                element={<CompanyApplicantsPage />}
              />

              {/* Internship Routes */}
              <Route path="/internships/available" element={<AvailableInternships />} />
              <Route path="/internships/applications" element={<MyApplications />} />
              <Route path="/internships/results" element={<Results />} />
              <Route path="/internships/resources" element={<Resources />} />
              <Route path="/internships/faq" element={<FAQs />} />
              <Route path="/internships/reports" element={<Reports />} />

              {/* NEW: Streamlit Route */}
              <Route path="/streamlit" element={<StreamlitDashboard />} />

              {/* Placeholder Routes */}
              <Route path="/company" element={<PlaceholderPage title="Company Dashboard" />} />
              <Route path="/admin" element={<PlaceholderPage title="Admin Dashboard" />} />
              <Route path="/student/support" element={<PlaceholderPage title="Help & Support" />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
