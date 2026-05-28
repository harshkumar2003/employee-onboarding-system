import { Users, CircleAlert, CircleCheckBig, Activity } from "lucide-react";

const Card = ({ title, value, change, description }) => {

  const iconMap = {
    "Total Employees": <Users size={18} />,
    "Pending Verifications": <CircleAlert size={18} />,
    "Completed Onboarding": <CircleCheckBig size={18} />,
    "Active Onboardees": <Activity size={18} />,
  };

  const colorMap = {
    "Total Employees": "text-blue-600 bg-blue-100",
    "Pending Verifications": "text-orange-500 bg-orange-100",
    "Completed Onboarding": "text-emerald-600 bg-emerald-100",
    "Active Onboardees": "text-violet-600 bg-violet-100",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl w-full px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-400">
      
      {/* Top Section */}
      <div className="flex items-center justify-between">

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center
          ${colorMap[title]}`}
        >
          {iconMap[title]}
        </div>

        {/* Change */}
        <span className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
          {change}
        </span>
      </div>

      {/* Value */}
      <h1 className={`text-3xl font-bold mt-6 ${colorMap[title].split(" ")[0]}`}>
        {value}
      </h1>

      {/* Title */}
      <p className="text-l font-semibold text-slate-700 mt-2">
        {title}
      </p>

      {/* Description */}
      <p className="text-xs text-slate-400 mt-1">
        {description}
      </p>
    </div>
  );
};

export default Card;