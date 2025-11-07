import { Link } from "react-router-dom";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function StudentSupport() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
        <p className="mt-2 text-lg text-gray-600">
          We're here to assist you with any questions or issues.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card text-center transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg">
            <Mail size={48} className="mx-auto text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Email Support</h2>
            <p className="mt-2 text-sm text-gray-500">
              Send us an email with your query, and we'll get back to you.
            </p>
            <a href="mailto:support@internsetu.gov.in" className="mt-4 inline-block text-primary font-semibold hover:underline">
              support@internsetu.gov.in
            </a>
          </div>

          <div className="card text-center transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg">
            <Phone size={48} className="mx-auto text-accent" />
            <h2 className="mt-4 text-xl font-semibold">Helpline Number</h2>
            <p className="mt-2 text-sm text-gray-500">
              Call our support team for immediate assistance.
            </p>
            <p className="mt-4 text-xl font-semibold">
              1800-000-000
            </p>
          </div>

          <div className="card text-center transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg">
            <ExternalLink size={48} className="mx-auto text-primary" />
            <h2 className="mt-4 text-xl font-semibold">FAQ & Guides</h2>
            <p className="mt-2 text-sm text-gray-500">
              Find answers to common questions and tutorials.
            </p>
            <Link to="/student/support" className="mt-4 inline-block text-primary font-semibold hover:underline">
              Visit Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
