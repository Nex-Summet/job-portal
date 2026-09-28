
import { useEffect, useState } from "react";
import {
  createJob,
  getAllJobs,
  deleteJob,
  updateJob
} from "./api/adminJobApi";

function AdminJobs() {
  const emptyForm = {
    title: "",
    company: "",
    location: "",
    description: "",
    salary: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  const [message, setMessage] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();

        setJobs(data.jobs);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      setDeletingId(jobId);
      setMessage("");

      const data = await deleteJob(jobId);

      setMessage(data.message);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== jobId)
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (job) => {
    setMessage("");

    setEditingJob({
      ...job
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setMessage("");

      const data = await updateJob(
        editingJob.id,
        {
          title: editingJob.title,
          company: editingJob.company,
          location: editingJob.location,
          description: editingJob.description,
          salary: editingJob.salary || ""
        }
      );

      setMessage(data.message);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === editingJob.id
            ? data.job
            : job
        )
      );

      setEditingJob(null);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update job"
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      const data = await createJob(formData);

      setMessage(data.message);

      setFormData(emptyForm);

      if (data.job) {
        setJobs((prevJobs) => [
          data.job,
          ...prevJobs
        ]);
      }

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create job"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gray-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <span className="inline-flex bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
            Administration
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-5">
            Job Management
          </h1>

          <p className="text-gray-400 text-lg mt-3">
            Create, update and manage job opportunities.
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

        {/* Add Job */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 mb-8">

          <div className="mb-7">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                +
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Job
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Create a new job opportunity for candidates.
                </p>
              </div>

            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="e.g. React Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Dehradun"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary
                </label>

                <input
                  type="text"
                  name="salary"
                  placeholder="e.g. ₹20,000"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

            </div>

            {/* Description */}
            <div className="mt-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description
              </label>

              <textarea
                name="description"
                placeholder="Enter job description..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              />

            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-7 py-3 rounded-xl transition shadow-sm"
            >
              {submitting
                ? "Adding Job..."
                : "Add Job"}
            </button>

          </form>

        </div>

        {/* Edit Job */}
        {editingJob && (
          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-7 mb-8">

            <div className="flex items-start justify-between gap-4 mb-7">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
                  ✎
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Edit Job
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Update the selected job information.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
              >
                ✕
              </button>

            </div>

            <form onSubmit={handleUpdateJob}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title
                  </label>

                  <input
                    type="text"
                    value={editingJob.title}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        title: e.target.value
                      })
                    }
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company
                  </label>

                  <input
                    type="text"
                    value={editingJob.company}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        company: e.target.value
                      })
                    }
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        location: e.target.value
                      })
                    }
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Salary
                  </label>

                  <input
                    type="text"
                    value={editingJob.salary || ""}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        salary: e.target.value
                      })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

              </div>

              {/* Description */}
              <div className="mt-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Description
                </label>

                <textarea
                  value={editingJob.description}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      description: e.target.value
                    })
                  }
                  rows="5"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
                />

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  type="submit"
                  disabled={updating}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-7 py-3 rounded-xl transition"
                >
                  {updating
                    ? "Updating..."
                    : "Update Job"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-7 py-3 rounded-xl transition"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        )}

        {/* Jobs List */}
        <section>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                All Jobs
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Manage all job opportunities available on
                the portal.
              </p>
            </div>

            <span className="self-start sm:self-auto bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full text-sm font-semibold">
              {jobs.length}{" "}
              {jobs.length === 1 ? "Job" : "Jobs"}
            </span>

          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-14 text-center">

              <div className="w-11 h-11 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

              <p className="text-gray-500 mt-5">
                Loading jobs...
              </p>

            </div>
          )}

          {/* Empty */}
          {!loading && jobs.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                💼
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6">
                No Jobs Found
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first job opportunity using
                the form above.
              </p>

            </div>
          )}

          {/* Job Cards */}
          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200 overflow-hidden flex flex-col"
                >

                  <div className="p-6 flex flex-col flex-1">

                    {/* Company Icon */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                      {job.company
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mt-5">
                      {job.title}
                    </h3>

                    <p className="text-blue-600 font-semibold mt-2">
                      {job.company}
                    </p>

                    <div className="mt-5 space-y-3">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                          📍
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Location
                          </p>

                          <p className="text-sm font-medium text-gray-700">
                            {job.location}
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                          ₹
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Salary
                          </p>

                          <p className="text-sm font-medium text-gray-700">
                            {job.salary ||
                              "Not specified"}
                          </p>
                        </div>

                      </div>

                    </div>

                    <p className="text-sm text-gray-500 leading-6 mt-5 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-auto pt-6 flex gap-3">

                      <button
                        onClick={() =>
                          handleEditClick(job)
                        }
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-lg transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteJob(job.id)
                        }
                        disabled={
                          deletingId === job.id
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition"
                      >
                        {deletingId === job.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">

                    <p className="text-xs text-gray-400">
                      Job ID: #{job.id}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>

    </div>
  );
}

export default AdminJobs;
