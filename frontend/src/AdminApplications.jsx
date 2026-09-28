
import { useEffect, useState } from "react";
import {
  getAllApplications,
  updateApplicationStatus
} from "./api/adminApplicationApi";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllApplications();

        setApplications(data.applications);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to fetch applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setUpdatingId(applicationId);
      setMessage("");

      const data = await updateApplicationStatus(
        applicationId,
        status
      );

      setMessage(data.message);

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.id === applicationId
            ? {
                ...application,
                status: status
              }
            : application
        )
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Shortlisted") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const shortlistedCount = applications.filter(
    (application) =>
      application.status === "Shortlisted"
  ).length;

  const rejectedCount = applications.filter(
    (application) =>
      application.status === "Rejected"
  ).length;

  const appliedCount = applications.filter(
    (application) =>
      application.status === "Applied"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gray-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <span className="inline-flex bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
            Administration
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-5">
            Application Management
          </h1>

          <p className="text-gray-400 text-lg mt-3">
            Review candidates and manage application
            statuses.
          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Message */}
        {message && (
          <div className="mb-7 bg-blue-50 border border-blue-200 text-blue-700 px-5 py-4 rounded-xl">
            {message}
          </div>
        )}

        {/* Stats */}
        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* Total */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Total Applications
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {applications.length}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  📄
                </div>

              </div>

            </div>

            {/* Applied */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Applied
                  </p>

                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {appliedCount}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl">
                  ⏳
                </div>

              </div>

            </div>

            {/* Shortlisted */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Shortlisted
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {shortlistedCount}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

            </div>

            {/* Rejected */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Rejected
                  </p>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {rejectedCount}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                  ✕
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-14 text-center">

            <div className="w-11 h-11 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

            <p className="text-gray-500 mt-5">
              Loading applications...
            </p>

          </div>
        )}

        {/* Empty */}
        {!loading &&
          applications.length === 0 &&
          !message && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                📄
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-6">
                No Applications Found
              </h2>

              <p className="text-gray-500 mt-2">
                There are currently no job applications.
              </p>

            </div>
          )}

        {/* Applications */}
        {!loading && applications.length > 0 && (
          <section>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Candidate Applications
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Review candidate information and update
                  application status.
                </p>
              </div>

              <span className="self-start sm:self-auto bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full text-sm font-semibold">
                {applications.length}{" "}
                {applications.length === 1
                  ? "Application"
                  : "Applications"}
              </span>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200 overflow-hidden"
                >

                  <div className="p-7">

                    {/* Job Header */}
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                          {application.job.company
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-gray-900">
                            {application.job.title}
                          </h3>

                          <p className="text-blue-600 font-semibold mt-1">
                            {application.job.company}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>

                    </div>

                    {/* Candidate */}
                    <div className="mt-6 bg-gray-50 rounded-xl p-5">

                      <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                        Candidate
                      </p>

                      <p className="text-lg font-bold text-gray-900 mt-2">
                        {application.user.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1 break-all">
                        {application.user.email}
                      </p>

                    </div>

                    {/* Job Information */}
                    <div className="mt-5 grid grid-cols-2 gap-4">

                      <div className="border border-gray-200 rounded-xl p-4">

                        <p className="text-xs text-gray-400">
                          Location
                        </p>

                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          📍 {application.job.location}
                        </p>

                      </div>

                      <div className="border border-gray-200 rounded-xl p-4">

                        <p className="text-xs text-gray-400">
                          Salary
                        </p>

                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          {application.job.salary ||
                            "Not specified"}
                        </p>

                      </div>

                    </div>

                    {/* Applied Date */}
                    <div className="flex items-center gap-3 mt-5">

                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                        📅
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Applied On
                        </p>

                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(
                            application.createdAt
                          )}
                        </p>
                      </div>

                    </div>

                    {/* Status Update */}
                    <div className="mt-6">

                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Update Application Status
                      </label>

                      <select
                        value={application.status}
                        disabled={
                          updatingId ===
                          application.id
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            application.id,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition"
                      >

                        <option value="Applied">
                          Applied
                        </option>

                        <option value="Shortlisted">
                          Shortlisted
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>

                      </select>

                      {updatingId ===
                        application.id && (
                        <p className="text-xs text-gray-500 mt-2">
                          Updating application status...
                        </p>
                      )}

                    </div>

                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-100 bg-gray-50 px-7 py-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-gray-500">
                        Application ID
                      </span>

                      <span className="text-sm font-semibold text-gray-800">
                        #{application.id}
                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </section>
        )}

      </div>

    </div>
  );
}

export default AdminApplications;

