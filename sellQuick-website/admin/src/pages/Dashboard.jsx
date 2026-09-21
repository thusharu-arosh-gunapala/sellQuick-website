import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import DashboardCard from "../components/DashboardCard";
import API, { getMediaUrl } from "../services/api";

// Container animation for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await API.get("/properties");
      setProperties(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalProperties = properties.length;
  const featuredCount = properties.filter((p) => p.isFeatured).length;
  const activeCount = properties.filter((p) => (p.status || "Active") === "Active").length;
  const pendingCount = properties.filter((p) => p.status === "Pending" || p.status === "Sold").length;

  const recentProperties = properties.slice(0, 5);

  const inquiries = [
    {
      name: "John Silva",
      property: "Luxury Villa",
      phone: "+94 77 123 4567",
    },
    {
      name: "Kasun Perera",
      property: "Modern Apartment",
      phone: "+94 71 555 6677",
    },
  ];

  return (
    <AdminLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8"
        >
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Welcome back, Admin. Here's what's happening today.
            </p>
          </div>

          <Link
            to="/admin/add-property"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors duration-200 shadow-sm text-sm font-semibold"
          >
            <FaPlus className="h-3 w-3" />
            Add Property
          </Link>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          <DashboardCard
            title="Total Properties"
            value={loading ? "..." : String(totalProperties)}
            icon={<FaBuilding />}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            change="Live DB"
            changeType="increase"
          />
          <DashboardCard
            title="Featured Properties"
            value={loading ? "..." : String(featuredCount)}
            icon={<FaStar />}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
            change="Homepage"
            changeType="increase"
          />
          <DashboardCard
            title="Active Listings"
            value={loading ? "..." : String(activeCount)}
            icon={<FaCheckCircle />}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
            change="Published"
            changeType="increase"
          />
          <DashboardCard
            title="Pending / Sold"
            value={loading ? "..." : String(pendingCount)}
            icon={<FaClock />}
            iconColor="text-violet-600"
            iconBg="bg-violet-50"
            change="Archived"
            changeType="decrease"
          />
        </motion.div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Recent Properties Table */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Recent Properties
              </h2>
              <Link
                to="/admin/properties"
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                View All ({totalProperties})
              </Link>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-3 font-medium">Property</th>
                    <th className="pb-3 font-medium hidden sm:table-cell">Location</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium hidden md:table-cell">Featured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-sm text-slate-400">
                        Loading properties from database...
                      </td>
                    </tr>
                  ) : recentProperties.length > 0 ? (
                    recentProperties.map((property) => (
                      <tr key={property._id || property.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 pr-4 font-medium text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={getMediaUrl(property.images?.[0] || property.image)}
                              alt={property.title}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/100x100?text=House";
                              }}
                              className="w-9 h-9 rounded-lg object-cover border border-slate-100"
                            />
                            <span className="truncate max-w-[180px]">{property.title}</span>
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-slate-600 whitespace-nowrap text-sm hidden sm:table-cell">
                          {property.location || "—"}
                        </td>
                        <td className="py-4 pr-4 text-slate-900 font-medium whitespace-nowrap text-sm">
                          {property.price || "—"}
                        </td>
                        <td className="py-4 pr-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              (property.status || "Active") === "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {property.status || "Active"}
                          </span>
                        </td>
                        <td className="py-4 whitespace-nowrap hidden md:table-cell">
                          {property.isFeatured ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                              ★ Featured
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">Standard</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-sm text-slate-400">
                        No properties found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Recent Inquiries Feed */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm"
          >
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6">
              Latest Inquiries
            </h2>

            <div className="space-y-6">
              {inquiries.map((inquiry, index) => (
                <div key={index} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                  {/* Avatar Placeholder */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                    {inquiry.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {inquiry.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5 truncate">
                      Interested in: <span className="font-medium text-slate-700">{inquiry.property}</span>
                    </p>
                    <a href={`tel:${inquiry.phone}`} className="inline-flex items-center gap-1.5 text-sm text-slate-600 mt-2 hover:text-blue-600 transition-colors">
                      <FaPhoneAlt className="h-3 w-3" />
                      {inquiry.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
              <Link
                to="/admin/inquiries"
                className="block w-full mt-6 bg-slate-100 text-slate-900 py-3 rounded-xl hover:bg-slate-200 transition-colors font-semibold text-sm text-center"
              >
                View All Inquiries
              </Link>
          </motion.div>

        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard;