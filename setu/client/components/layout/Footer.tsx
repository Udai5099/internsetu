import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          {/* --- MODIFICATION: Reduced logo margin --- */}
          <img
            src="/setulogo.webp"
            alt="InternSetu Logo"
            className="h-24 mb-2"
          />
          <h3 className="text-xl font-bold text-white">InternSetu</h3>
          <p className="mt-2 text-sm opacity-90 max-w-sm">
            AI-Based Smart Allocation Engine for PM Internship Scheme (MCA).
            Building a transparent, fair and efficient internship ecosystem.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/apply" className="hover:underline">
                Apply Now
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/student/support" className="hover:underline">
                Help & Support
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@internsetu.gov.in</li>
            <li>Phone: 1800-000-000</li>
            <li className="flex gap-3 pt-2">
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.1-.7.5-1.6.9-2.5 1.1C18 4.7 17 4.2 16 4.2c-2.1 0-3.8 1.8-3.8 3.9 0 .3 0 .6.1.8-3.2-.2-6-1.8-7.9-4.2-.3.6-.5 1.2-.5 1.9 0 1.3.6 2.5 1.6 3.2-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.3 3.5 3.1 3.9-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.5 1.9 2.6 3.6 2.7-1.3 1.1-3 1.8-4.8 1.8H2c1.8 1.2 4 2 6.3 2 7.6 0 11.7-6.4 11.7-11.9v-.5c.8-.5 1.4-1.2 2-2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-5.3c0-1.3 0-2.9-1.7-2.9-1.7 0-2 1.4-2 2.8V24h-4V8z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M23.5 6.2c-.3-1.4-1.4-2.4-2.7-2.7C18.8 3 12 3 12 3s-6.8 0-8.8.5C1.8 3.8.8 4.8.5 6.2 0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.4 1.4 2.4 2.7 2.7C5.2 21 12 21 12 21s6.8 0 8.8-.5c1.4-.3 2.4-1.4 2.7-2.7.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.7 15.5V8.5L16 12l-6.3 3.5z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container mx-auto py-4 text-sm opacity-80">
          © {new Date().getFullYear()} InternSetu – Ministry of Corporate
          Affairs, Government of India
        </div>
      </div>
    </footer>
  );
}

