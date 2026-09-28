
import { useEffect, useState } from "react";
import { getProfile } from "./api/authApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setUser(data.user);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to fetch profile"
        );
      }
    };

    fetchProfile();
  }, []);

  // Error
  if (message) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

          <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl">
            !
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-5">
            Unable to Load Profile
          </h2>

          <p className="text-gray-500 mt-2">
            {message}
          </p>

        </div>
      </div>
    );
  }

  // Loading
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">

          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-600 mt-4">
            Loading profile...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">

      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage and view your account information.
          </p>

        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Profile Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-10">

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-blue-600 border-4 border-white/20 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="text-white">

                <h2 className="text-3xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-300 mt-2">
                  {user.email}
                </p>

                <span className="inline-block mt-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold capitalize">
                  {user.role}
                </span>

              </div>

            </div>

          </div>

          {/* Account Information */}
          <div className="p-8">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Account Information
                </h3>

                <p className="text-gray-500 mt-1">
                  Your registered account details
                </p>
              </div>

            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition">

                <p className="text-sm text-gray-500 mb-2">
                  Full Name
                </p>

                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>

              </div>

              {/* Email */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition">

                <p className="text-sm text-gray-500 mb-2">
                  Email Address
                </p>

                <p className="text-lg font-semibold text-gray-900 break-all">
                  {user.email}
                </p>

              </div>

              {/* Role */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition">

                <p className="text-sm text-gray-500 mb-2">
                  Account Role
                </p>

                <span className="inline-flex bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold capitalize">
                  {user.role}
                </span>

              </div>

              {/* User ID */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition">

                <p className="text-sm text-gray-500 mb-2">
                  User ID
                </p>

                <p className="text-lg font-semibold text-gray-900">
                  #{user.id}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Info */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">

          <p className="text-sm text-blue-800">
            Your profile information is securely fetched from
            the backend using your authenticated account.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;

