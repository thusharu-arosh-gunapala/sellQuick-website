import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaUserCircle, FaUsers, FaUserShield, FaUserTie, FaUserCheck } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";

const DEFAULT_USERS = [
  { id: 1, name: "John Silva", email: "john@gmail.com", role: "Customer", status: "Active" },
  { id: 2, name: "Kasun Perera", email: "kasun@gmail.com", role: "Agent", status: "Active" },
  { id: 3, name: "Admin User", email: "admin@sellquick.com", role: "Admin", status: "Active" },
  { id: 4, name: "Nimal Fernando", email: "nimal@gmail.com", role: "Customer", status: "Inactive" },
];

const Users = () => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("sellquick_users");
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch (e) {
      return DEFAULT_USERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sellquick_users", JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  const [searchQuery, setSearchQuery] = useState("");
  
  // Unified Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "Customer", status: "Active" });

  const roleStyles = {
    Admin: "bg-purple-50 text-purple-700 border border-purple-100",
    Agent: "bg-blue-50 text-blue-700 border border-blue-100",
    Customer: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  };

  const statusStyles = {
    Active: "bg-emerald-50 text-emerald-700",
    Inactive: "bg-red-50 text-red-600",
  };

  // Metrics
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const agentCount = users.filter((u) => u.role === "Agent").length;
  const customerCount = users.filter((u) => u.role === "Customer").length;

  // Search Logic
  const filteredUsers = users.filter((user) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (user.name || "").toLowerCase().includes(lowerCaseQuery) ||
      (user.email || "").toLowerCase().includes(lowerCaseQuery) ||
      (user.role || "").toLowerCase().includes(lowerCaseQuery) ||
      (user.status || "").toLowerCase().includes(lowerCaseQuery)
    );
  });

  // Delete Logic
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // --- Modal & Form Handlers ---

  const openAddModal = () => {
    setModalMode("add");
    setFormData({ name: "", email: "", role: "Customer", status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setModalMode("edit");
    setCurrentUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === "add") {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { id: newId, ...formData }]);
    } else if (modalMode === "edit") {
      setUsers(users.map((user) => (user.id === currentUser.id ? { ...user, ...formData } : user)));
    }
    
    closeModal();
  };

  return (
    <AdminLayout>
      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Users Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage customers, agents and administrators
            </p>
          </div>
          
          {/* Add User Button */}
          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors w-full sm:w-auto shadow-sm"
          >
            <FaPlus className="text-xs" />
            Add User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <FaUsers />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Users</p>
              <h3 className="text-xl font-bold text-slate-900">{totalUsers}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <FaUserShield />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Admins</p>
              <h3 className="text-xl font-bold text-slate-900">{adminCount}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <FaUserTie />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Agents</p>
              <h3 className="text-xl font-bold text-slate-900">{agentCount}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FaUserCheck />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Customers</p>
              <h3 className="text-xl font-bold text-slate-900">{customerCount}</h3>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3 border border-slate-200 bg-white rounded-xl px-4 py-2.5 focus-within:border-slate-400 transition-colors">
          <FaSearch className="text-slate-400 text-sm flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
          />
        </div>

        {/* --- DESKTOP & TABLET VIEW --- */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-slate-800">{user.name}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${roleStyles[user.role]}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(user)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                            title="Edit User"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors"
                            title="Delete User"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-sm text-slate-400">
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MOBILE VIEW (Cards) --- */}
        <div className="md:hidden space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                      alt={user.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">{user.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 break-all">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${roleStyles[user.role]}`}>
                    {user.role}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
                    {user.status}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => openEditModal(user)}
                    className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  >
                    <FaEdit className="text-sm" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-red-600 transition-colors"
                    title="Delete User"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl text-sm text-slate-400">
              No users found matching your search.
            </div>
          )}
        </div>

        {/* --- ADD / EDIT USER MODAL --- */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <FaUserCircle />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {modalMode === "add" ? "Add New User" : "Edit User"}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {modalMode === "add" ? "Create a new user account" : `Updating ${currentUser.name}'s details`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body / Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-slate-900 transition-colors text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-slate-900 transition-colors text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-slate-900 transition-colors text-sm bg-white"
                    >
                      <option>Customer</option>
                      <option>Agent</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-slate-900 transition-colors text-sm bg-white"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row-reverse gap-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    {modalMode === "add" ? "Create User" : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Users;