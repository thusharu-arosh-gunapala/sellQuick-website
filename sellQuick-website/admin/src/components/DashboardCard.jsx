import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  value,
  icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
  change,
  changeType = "increase", // "increase" or "decrease"
}) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500">
            {title}
          </span>
          <span className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">
            {value}
          </span>
        </div>

        {/* Reduced icon container size */}
        <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${iconBg} ${iconColor}`}>
          {icon}
        </div>
      </div>

      {/* Change indicator */}
      {change && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md ${
              changeType === "increase"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {changeType === "increase" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
            {change}
          </span>
          <span className="text-slate-400">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCard;