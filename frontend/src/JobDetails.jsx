
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { applyForJob } from "./api/jobApplicationApi";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setJob(data.job);
      } catch (error) {
        setMessage(
          error.message || "Failed to fetch job"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      setMessage("");

      const data = await applyForJob(id);

      setMessage(data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to apply"
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-500 mt-5">
            Loading job details...
          </p>

        </div>

      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 text-center max-w-md w-full">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-red-600 text-2xl font-bold">
            !
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-6">
            Job Not Found
          </h2>

          <p className="text-gray-500 mt-3">
            {message || "Unable to find this job."}
          </p>

          <Link
            to="/jobs"
            className="inline-block mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Back to Jobs
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gray-950 text-white">

        <div className="max-w-6xl mx-auto px-6 py-12">

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition mb-8"
          >
            ← Back to Jobs
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

            <div>

              <span className="inline-flex bg-blue-600/20 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                Job Opportunity
              </span>

              <h1 className="text-4xl md:text-5xl font-bold mt-5">
                {job.title}
              </h1>

              <p className="text-xl text-gray-400 mt-3">
                {job.company}
              </p>

            </div>

            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {job.company?.charAt(0).toUpperCase()}
            </div>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

          {/* Description */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-900">
                About This Job
              </h2>

              <p className="text-gray-600 leading-7 mt-5 whitespace-pre-line">
                {job.description}
              </p>

            </div>

            {/* Company Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mt-7">

              <h2 className="text-2xl font-bold text-gray-900">
                About the Company
              </h2>

              <div className="flex items-center gap-4 mt-5">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  {job.company?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {job.company}
                  </p>

                  <p className="text-sm text-gray-500">
                    Hiring through Job Portal
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Job Summary */}
          <aside>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 lg:sticky lg:top-6">

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Job Summary
              </h2>

              {/* Location */}
              <div className="flex gap-4 pb-5 border-b border-gray-100">

                <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                  📍
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Location
                  </p>

                  <p className="text-gray-800 font-semibold mt-1">
                    {job.location}
                  </p>
                </div>

              </div>

              {/* Salary */}
              <div className="flex gap-4 py-5 border-b border-gray-100">

                <div className="w-10 h-10 shrink-0 rounded-lg bg-green-50 flex items-center justify-center">
                  ₹
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Salary
                  </p>

                  <p className="text-gray-800 font-semibold mt-1">
                    {job.salary || "Not specified"}
                  </p>
                </div>

              </div>

              {/* Job ID */}
              <div className="flex gap-4 py-5">

                <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
                  #
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Job ID
                  </p>

                  <p className="text-gray-800 font-semibold mt-1">
                    #{job.id}
                  </p>
                </div>

              </div>

              {/* Apply */}
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3.5 rounded-xl transition shadow-sm"
              >
                {applying
                  ? "Applying..."
                  : "Apply Now"}
              </button>

              {message && (
                <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm text-center">
                  {message}
                </div>
              )}

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default JobDetails;

