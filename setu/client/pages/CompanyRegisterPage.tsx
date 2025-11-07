import { Link } from "react-router-dom";

// Helper component for consistent input styling
const InputField = ({ label, type = "text", placeholder, name, required = true }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required={required}
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

export default function CompanyRegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic (e.g., API call to backend)
    alert("Registration form submitted! (Backend logic needed)");
  };

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-2">Register Your Company</h1>
          <p className="text-muted-foreground mb-8">
            Join InternSetu to find the best talent for your internship programs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Company Name" name="companyName" placeholder="e.g., Acme Corporation" />
              <InputField label="Industry" name="industry" placeholder="e.g., Technology" />
              <InputField label="Website" name="website" type="url" placeholder="https://example.com" />
              <InputField label="Company Size" name="companySize" placeholder="e.g., 1-50 employees" />
              <InputField label="Contact Person" name="contactName" placeholder="e.g., Jane Doe" />
              <InputField label="Contact Email" name="contactEmail" type="email" placeholder="jane.doe@example.com" />
            </div>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputField label="Password" name="password" type="password" placeholder="••••••••" />
               <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" required className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the <a href="/privacy" className="text-blue-600 hover:underline">Terms and Conditions</a>
                </label>
              </div>
            </div>

            <div>
              <button type="submit" className="w-full btn btn-accent text-lg">
                Create Account
              </button>
            </div>
          </form>

           <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}