import { Bell } from "lucide-react";

const Navbar = ({ onLogout }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">HR Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <Bell className="text-slate-600" />
        {onLogout ? (
          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
