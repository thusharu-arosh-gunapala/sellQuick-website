import { useState } from "react";
import { FaSearch, FaTrash, FaEye, FaPhoneAlt, FaTimes, FaEnvelope, FaHome } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "John Silva",
      email: "john@gmail.com",
      phone: "+94771234567",
      property: "Luxury Villa",
      message: "I am interested in this property. Please contact me.",
      status: "New",
    },
    {
      id: 2,
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      phone: "+94711234567",
      property: "Modern Apartment",
      message: "Can I schedule a property viewing for this weekend?",
      status: "Read",
    },
    {
      id: 3,
      name: "Nimal Fernando",
      email: "nimal@gmail.com",
      phone: "+94751234567",
      property: "Family House",
      message: "Please send more property details, specifically regarding the land size and neighborhood.",
      status: "New",
    },
  ]);

  // State to control the View Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const statusStyles = {
    New: "bg-emerald-50 text-emerald-700",
    Read: "bg-slate-100 text-slate-600",
  };

  // Delete Function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
      // If the deleted item is currently open in the modal, close the modal
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // View Function
  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    // Optional: Update status to 'Read' when viewed
    setInquiries(
      inquiries.map((item) =>
        item.id === inquiry.id ? { ...item, status: "Read" } : item
      )
    );
  };

  // Close Modal Function
  const handleCloseModal = () => {
    setSelectedInquiry(null);
  };

  return (
    <AdminLayout>
      <div className="relative">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Property Inquiries
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage customer inquiries and messages
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3 border border-slate-200 bg-white rounded-xl px-4 py-2.5 focus-within:border-slate-400 transition-colors">
          <FaSearch className="text-slate-400 text-sm flex-shrink-0" />
          <input
            type="text"
            placeholder="Search inquiries..."
            className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
          />
        </div>

        {/* --- DESKTOP & TABLET VIEW --- */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-800">{inquiry.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{inquiry.property}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{inquiry.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inquiry.status]}`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleView(inquiry)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                            title="View Message"
                          >
                            <FaEye className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(inquiry.id)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors"
                            title="Delete"
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
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MOBILE VIEW (Cards) --- */}
        <div className="md:hidden space-y-4">
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{inquiry.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{inquiry.email}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inquiry.status]}`}>
                    {inquiry.status}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <FaHome className="text-slate-400 text-[10px]" />
                    {inquiry.property}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-slate-400 text-[10px]" />
                    <a href={`tel:${inquiry.phone}`} className="hover:text-blue-600">
                      {inquiry.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleView(inquiry)}
                    className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  >
                    <FaEye className="text-sm" />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl text-sm text-slate-400">
              No inquiries found.
            </div>
          )}
        </div>

        {/* --- VIEW MODAL --- */}
        {selectedInquiry && (
          <div 
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Inquiry Details</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Received from {selectedInquiry.name}</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold text-lg">
                    {selectedInquiry.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">{selectedInquiry.name}</h3>
                    <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[selectedInquiry.status]}`}>
                      {selectedInquiry.status}
                    </span>
                  </div>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email</p>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-sm text-slate-700 hover:text-blue-600 break-all">
                        {selectedInquiry.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <FaPhoneAlt className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Phone</p>
                      <a href={`tel:${selectedInquiry.phone}`} className="text-sm text-slate-700 hover:text-blue-600">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <FaHome className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Interested In</p>
                      <p className="text-sm font-medium text-slate-700">{selectedInquiry.property}</p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 italic leading-relaxed">
                    "{selectedInquiry.message}"
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row-reverse gap-2">
                <button
                  onClick={handleCloseModal}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <FaTrash className="text-sm" />
                  Delete Inquiry
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Inquiries;