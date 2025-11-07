import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, User, Briefcase, Info, HelpCircle, ChevronDown } from "lucide-react";

export default function Header2() {
  const [open, setOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [internshipsOpen, setInternshipsOpen] = useState(false);

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setStudentOpen(false);
    setInternshipsOpen(false);
  };

  // Function to toggle a specific dropdown
  const toggleDropdown = (dropdown) => {
    if (dropdown === 'student') {
      setStudentOpen(!studentOpen);
      setInternshipsOpen(false); // Close other dropdowns
    } else if (dropdown === 'internships') {
      setInternshipsOpen(!internshipsOpen);
      setStudentOpen(false); // Close other dropdowns
    }
  };

  return (
    <header className="bg-primary text-primary-foreground sticky top-[64px] z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2">
        {/* Mobile menu toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => {
            setOpen(!open);
            closeAllDropdowns(); // Close dropdowns when mobile menu is toggled
          }}
          className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded border border-white/20"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 justify-around text-sm font-medium">
          {/* Home */}
          <NavLink to="/" className="flex items-center gap-1 hover:underline underline-offset-4">
            <Home size={16} /> Home
          </NavLink>

          {/* Student Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('student')}
              className="flex items-center gap-1 hover:underline underline-offset-4"
            >
              <User size={16} /> Student <ChevronDown size={14} className={studentOpen ? 'rotate-180 transition-transform' : ''} />
            </button>
            <div className={`absolute left-0 mt-2 ${studentOpen ? 'flex' : 'hidden'} flex-col w-48 bg-white text-black shadow-lg rounded-md py-2 z-50`}>
              <Link to="/student/dashboard" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Dashboard</Link>
              <Link to="/student/profile" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Profile</Link>
              <Link to="/student/docs" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Documents</Link>
              <Link to="/student/settings" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Settings</Link>
              <Link to="/student/support" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Support</Link>
            </div>
          </div>

          {/* Internships Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('internships')}
              className="flex items-center gap-1 hover:underline underline-offset-4"
            >
              <Briefcase size={16} /> Internships <ChevronDown size={14} className={internshipsOpen ? 'rotate-180 transition-transform' : ''} />
            </button>
            <div className={`absolute left-0 mt-2 ${internshipsOpen ? 'flex' : 'hidden'} flex-col w-56 bg-white text-black shadow-lg rounded-md py-2 z-50`}>
              <Link to="/internships/available" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Available Internships</Link>
              <Link to="/internships/applications" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>My Applications</Link>
              <Link to="/internships/results" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Results</Link>
              <Link to="/internships/resources" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Resources</Link>
              <Link to="/internships/faq" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>FAQs</Link>
              <Link to="/internships/reports" className="px-3 py-2 hover:bg-gray-100" onClick={closeAllDropdowns}>Reports</Link>
              <div className="border-t my-1"></div>
              <Link
                to="/company/join"
                className="px-3 py-2 font-semibold text-primary hover:bg-primary hover:text-white rounded"
                onClick={closeAllDropdowns}
              >
                Join as a Company
              </Link>
            </div>
          </div>

          {/* Eligibility */}
          <a
            href="https://pminternship.mca.gov.in/login/#eligibility-criteria"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Info size={16} /> Eligibility
          </a>

          {/* Help */}
          <NavLink to="/student/support" className="flex items-center gap-1 hover:underline underline-offset-4">
            <HelpCircle size={16} /> Help
          </NavLink>
        </nav>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-white/20 bg-primary/95">
          <div className="container mx-auto py-2 flex flex-col gap-2 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-1">
              <Home size={16} /> Home
            </Link>

            {/* Student */}
            <details>
              <summary className="flex items-center gap-1 cursor-pointer">
                <User size={16} /> Student
              </summary>
              <div className="ml-6 flex flex-col">
                <Link to="/student/dashboard" className="py-1">Dashboard</Link>
                <Link to="/student/profile" className="py-1">Profile</Link>
                <Link to="/student/docs" className="py-1">Documents</Link>
                <Link to="/student/settings" className="py-1">Settings</Link>
                <Link to="/student/support" className="py-1">Support</Link>
              </div>
            </details>

            {/* Internships */}
            <details>
              <summary className="flex items-center gap-1 cursor-pointer">
                <Briefcase size={16} /> Internships
              </summary>
              <div className="ml-6 flex flex-col">
                <Link to="/internships/available" className="py-1">Available Internships</Link>
                <Link to="/internships/applications" className="py-1">My Applications</Link>
                <Link to="/internships/results" className="py-1">Results</Link>
                <Link to="/internships/resources" className="py-1">Resources</Link>
                <Link to="/internships/faq" className="py-1">FAQs</Link>
                <Link to="/internships/reports" className="py-1">Reports</Link>
                <Link to="/company/join" className="py-1 font-semibold text-accent">Join as a Company</Link>
              </div>
            </details>

            <a
              href="https://pminternship.mca.gov.in/login/#eligibility-criteria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Info size={16} /> Eligibility
            </a>

            <Link to="/student/support" onClick={() => setOpen(false)} className="flex items-center gap-1">
              <HelpCircle size={16} /> Help
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
