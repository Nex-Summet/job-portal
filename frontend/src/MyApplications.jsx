
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

  if (message) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-10 text-center max-w-md w-full">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-red-600 text-2xl font-bold">
            !
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-6">
            Unable to Load Profile
          </h2>

          <p className="text-gray-500 mt-3">
            {message}
          </p>

        </div>

      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-11 h-11 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-500 mt-5">
            Loading profile...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gray-950 text-white">

        <div className="max-w-5xl mx-auto px-6 py-12">

          <span className="inline-flex bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
            Account
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-5">
            My Profile
          </h1>

          <p className="text-gray-400 text-lg mt-3">
            View your account information and profile details.
          </p>

        </div>

      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10">

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

              {/* Avatar */}
              <div className="w-24 h-24 shrink-0 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div className="text-white">

                <h2 className="text-3xl font-bold">
                  {user.name}
                </h2>

                <p className="text-blue-100 mt-2">
                  {user.email}
                </p>

                <span className="inline-flex mt-4 bg-white/20 border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold capitalize">
                  {user.role}
                </span>

              </div>

            </div>

          </div>

          {/* Account Information */}
          <div className="p-8">

            <div className="mb-7">

              <h3 className="text-2xl font-bold text-gray-900">
                Account Information
              </h3>

              <p className="text-gray-500 mt-1">
                Your registered account details.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    👤
                  </div>

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                </div>

                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>

              </div>

              {/* Email */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    ✉️
                  </div>

                  <p className="text-sm text-gray-500">
                    Email Address
                  </p>

                </div>

                <p className="text-lg font-semibold text-gray-900 break-all">
                  {user.email}
                </p>

              </div>

              {/* Role */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    🛡️
                  </div>

                  <p className="text-sm text-gray-500">
                    Account Role
                  </p>

                </div>

                <span className="inline-flex bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold capitalize">
                  {user.role}
                </span>

              </div>

              {/* User ID */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    #
                  </div>

                  <p className="text-sm text-gray-500">
                    User ID
                  </p>

                </div>

                <p className="text-lg font-semibold text-gray-900">
                  #{user.id}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Security Information */}
        <div className="mt-7 bg-blue-50 border border-blue-100 rounded-2xl p-6">

          <div className="flex gap-4">

            <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-100 flex items-center justify-center">
              🔒
            </div>

            <div>

              <h3 className="font-semibold text-blue-900">
                Account Security
              </h3>

              <p className="text-sm text-blue-700 mt-1 leading-6">
                Your profile information is securely fetched
                from the backend using authenticated API
                access.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
