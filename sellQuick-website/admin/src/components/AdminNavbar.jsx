import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";

const AdminNavbar = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="h-16 px-6 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-xl text-gray-700"
          >
            <FaBars />
          </button>

          <h1 className="text-2xl font-bold text-blue-600">
            SellQuick Admin
          </h1>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-96">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Messages */}
          <button className="relative">
            <FaEnvelope className="text-xl text-gray-600" />

            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Notifications */}
          <button className="relative">
            <FaBell className="text-xl text-gray-600" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              5
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer">

            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="hidden sm:block">
              <h3 className="text-sm font-semibold">
                Admin User
              </h3>

              <p className="text-xs text-gray-500">
                Super Admin
              </p>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;