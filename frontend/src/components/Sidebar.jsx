import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  ClipboardList,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const username = "Harsh Kumar";
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", Icon: LayoutDashboard },
    { name: "Employee", path: "/dashboard/employee", Icon: Users },
    { name: "Task", path: "/dashboard/task", Icon: ClipboardList },
    { name: "Doc Review", path: "/dashboard/doc", Icon: ShieldCheck },
    { name: "Settings", path: "/dashboard/settings", Icon: Settings },
  ];

  const handleClick = ()=>{

    navigate("/");

  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0F172A] text-white p-2 rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0F172A] text-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
      >
        <div className="w-full flex flex-col h-full justify-between">
          {/* Logo + Close */}
          <div className="flex items-center justify-between md:justify-center md:items-center border-b border-slate-700">
            <img src="/logo-1.png" alt="logo" className="w-26 h-auto " />

            <button
              onClick={() => setOpen(false)}
              className="md:hidden pr-4 flex items-center"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2 p-4 flex-1">
            {navItems.map((item) => {
              const Icon = item.Icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#122143] text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {username.charAt(0)}
              </div>

              <div className="flex justify-evenly gap-8 items-center">
                <h2 className="text-sm font-semibold text-white items-center justify-center justify-self-center">{username}</h2>
                <button className="items-center cursor-pointer border-0 bg-red-600 rounded-4xl p-2" onClick={handleClick}>
                    <LogOut size={18}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
