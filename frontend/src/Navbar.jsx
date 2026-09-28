
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      role = payload.role;
    } catch (error) {
      role = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;

    return `
      px-4 py-2.5
      rounded-lg
      text-sm
      font-medium
      whitespace-nowrap
      transition-all
      duration-200
      ${
        isActive
          ? "bg-blue-600 text-white shadow-sm"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }
    `;
  };

  return (
    <nav className="bg-gray-950 text-white border-b border-gray-800 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="min-h-[82px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/jobs"
            className="flex items-center gap-3 group shrink-0"
          >

            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:bg-blue-500 transition">
              J
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition">
                Job Portal
              </h1>

              <p className="text-[11px] text-gray-500 tracking-wide">
                FIND YOUR NEXT OPPORTUNITY
              </p>
            </div>

          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto">

            <Link
              to="/jobs"
              className={getLinkClass("/jobs")}
            >
              Jobs
            </Link>

            {token && (
              <>
                <Link
                  to="/profile"
                  className={getLinkClass("/profile")}
                >
                  Profile
                </Link>

                <Link
                  to="/my-applications"
                  className={getLinkClass("/my-applications")}
                >
                  My Applications
                </Link>
              </>
            )}

            {/* Admin Navigation */}
            {role === "admin" && (
              <>
                <Link
                  to="/admin/jobs"
                  className={getLinkClass("/admin/jobs")}
                >
                  Admin Jobs
                </Link>

                <Link
                  to="/admin/applications"
                  className={getLinkClass(
                    "/admin/applications"
                  )}
                >
                  Admin Applications
                </Link>
              </>
            )}

            {/* Guest Navigation */}
            {!token && (
              <>
                <Link
                  to="/login"
                  className={getLinkClass("/login")}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="ml-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-md"
                >
                  Register
                </Link>
              </>
            )}

            {/* Logout */}
            {token && (
              <button
                onClick={handleLogout}
                className="ml-3 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-md"
              >
                Logout
              </button>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;

