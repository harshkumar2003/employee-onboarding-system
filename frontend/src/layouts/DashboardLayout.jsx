import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role } = useAuth();

  const dashboardMeta = useMemo(() => {
    const roleMap = {
      ADMIN: {
        title: "Admin Dashboard",
        subtitle: "Manage users, permissions, and system oversight.",
        accent: "#7c3aed",
        softAccent: "rgba(124, 58, 237, 0.08)",
        iconBg: "rgba(124, 58, 237, 0.12)",
      },
      HR: {
        title: "HR Dashboard",
        subtitle: "Manage onboarding with clarity and speed.",
        accent: "#1d4ed8",
        softAccent: "rgba(29, 78, 216, 0.08)",
        iconBg: "rgba(29, 78, 216, 0.12)",
      },
      EMPLOYEE: {
        title: "Employee Dashboard",
        subtitle: "Track your tasks, documents, and onboarding progress.",
        accent: "#059669",
        softAccent: "rgba(5, 150, 105, 0.08)",
        iconBg: "rgba(5, 150, 105, 0.12)",
      },
    };

    return roleMap[role] ?? roleMap.HR;
  }, [role]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f8fafc",
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onMenuClick={() => setMobileOpen(true)}
        title={dashboardMeta.title}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          ml: { md: "292px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar
          onMenuClick={() => setMobileOpen(true)}
          title={dashboardMeta.title}
          subtitle={dashboardMeta.subtitle}
          accent={dashboardMeta.accent}
          softAccent={dashboardMeta.softAccent}
          iconBg={dashboardMeta.iconBg}
        />
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3.5 },
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
