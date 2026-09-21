import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaEnvelope,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaAddressBook,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

    const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Properties", path: "/admin/properties", icon: <FaBuilding /> },
    { name: "Add Property", path: "/admin/add-property", icon: <FaPlusCircle /> },
    { name: "Inquiries", path: "/admin/inquiries", icon: <FaEnvelope /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Contact Update", path: "/admin/contact-update", icon: <FaAddressBook /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile Overlay - Added backdrop blur for premium feel */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0
          z-50 h-screen w-72 shrink-0
          bg-zinc-950 text-white
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-20 px-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold tracking-tight">
            Sell<span className="text-blue-500">Quick</span>
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-zinc-400 hover:text-white transition-colors p-2 -mr-2"
          >
            <FaTimes />
          </button>
        </div>

        {/* Profile - Modern Floating Card Style */}
        <div className="p-4 shrink-0">
          <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-3 rounded-2xl">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Admin"
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/10"
              />
              {/* Online Status Dot */}
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-white truncate">
                Admin User
              </h3>
              <p className="text-xs text-zinc-400 truncate">
                Super Admin
              </p>
            </div>
          </div>
        </div>

        {/* Menu - Flex grow to push logout to bottom */}
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `group flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`text-base transition-colors ${isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout - Sits perfectly at the bottom */}
        <div className="shrink-0 p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <FaSignOutAlt className="text-base" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;