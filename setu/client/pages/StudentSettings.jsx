import { useState } from "react";
import { Link } from "react-router-dom";
import { Save } from "lucide-react";

export default function StudentSettings() {
  const [email, setEmail] = useState("student@example.com");
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your account preferences and notifications.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSave}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-md">
            <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 cursor-pointer">
              Email Notifications
              <p className="text-xs text-gray-500">Receive updates on new internships and application statuses.</p>
            </label>
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
