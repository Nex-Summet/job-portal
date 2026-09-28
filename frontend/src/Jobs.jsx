
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "./api/jobApi";
import { applyForJob } from "./api/jobApplicationApi";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState(null);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
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

  const handleApply = async (jobId) => {
    try {
      setApplyingJobId(jobId);
      setMessage("");

      const data = await applyForJob(jobId);

      setMessage(data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to apply"
      );
    } finally {
      setApplyingJobId(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText);

    const matchesLocation =
      location === "" ||
      job.location.toLowerCase() ===
        location.toLowerCase();

    return matchesSearch && matchesLocation;
  });

  const locations = [
    ...new Set(jobs.map((job) => job.location))
  ];

  const totalPages = Math.ceil(
    filteredJobs.length / jobsPerPage
  );

  const startIndex =
    (currentPage - 1) * jobsPerPage;

  const currentJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gray-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="max-w-3xl">

            <span className="inline-flex items-center bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
              🚀 Explore Career Opportunities
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
              Find Your Next
              <span className="text-blue-500">
                {" "}Opportunity
              </span>
            </h1>

            <p className="text-gray-400 text-lg mt-5 leading-7">
              Discover jobs that match your skills,
              experience, and preferred location.
            </p>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Search & Filter */}
        {!loading && jobs.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 -mt-16 relative z-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Search */}
              <div className="md:col-span-2">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Jobs
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>

                  <input
                    type="text"
                    placeholder="Search by job title or company..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />

                </div>

              </div>

              {/* Location */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>

                <select
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">
                    All Locations
                  </option>

                  {locations.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-5 border-t border-gray-100">

              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">
                  {filteredJobs.length}
                </span>{" "}
                {filteredJobs.length === 1
                  ? "job"
                  : "jobs"}{" "}
                available
              </p>

              {(search || location) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Clear Filters
                </button>
              )}

            </div>

          </div>
        )}

        {/* Message */}
        {message && (
          <div className="mt-6 bg-blue-50 border border-blue-200 text-blue-700 px-5 py-4 rounded-xl">
            {message}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-14 text-center">

            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

            <p className="text-gray-500 mt-4">
              Loading available jobs...
            </p>

          </div>
        )}

        {/* No Jobs */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-14 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
              💼
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              No Jobs Available
            </h2>

            <p className="text-gray-500 mt-2">
              There are currently no job opportunities
              available.
            </p>

          </div>
        )}

        {/* No Search Results */}
        {!loading &&
          jobs.length > 0 &&
          filteredJobs.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-14 text-center mt-8">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
                🔍
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-5">
                No Jobs Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or location
                filter.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* Jobs */}
        {!loading && currentJobs.length > 0 && (
          <section className="mt-10">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Jobs
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Browse opportunities and apply to
                  positions that match your skills.
                </p>
              </div>

              <span className="self-start sm:self-auto bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full text-sm font-semibold">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "Job"
                  : "Jobs"}
              </span>

            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-200 overflow-hidden flex flex-col"
                >

                  <div className="p-6 flex flex-col flex-1">

                    {/* Company Icon */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold mb-5">
                      {job.company
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                      {job.title}
                    </h3>

                    <p className="text-blue-600 font-semibold mt-2">
                      {job.company}
                    </p>

                    {/* Job Info */}
                    <div className="mt-6 space-y-4">

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
                              "Salary not specified"}
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-6 mt-6 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-auto pt-7 flex gap-3">

                      <Link
                        to={`/jobs/${job.id}`}
                        className="flex-1 text-center border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2.5 rounded-lg transition"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() =>
                          handleApply(job.id)
                        }
                        disabled={
                          applyingJobId === job.id
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition"
                      >
                        {applyingJobId === job.id
                          ? "Applying..."
                          : "Apply Now"}
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>

              </div>
            )}

          </section>
        )}

      </div>

    </div>
  );
}

export default Jobs;

