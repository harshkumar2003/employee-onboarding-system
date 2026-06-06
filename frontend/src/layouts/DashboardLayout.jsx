import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const decodeBase64Url = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  return atob(padded);
};

const getRoleFromToken = (accessToken) => {
  if (!accessToken) {
    return "HR";
  }

  try {
    const payload = accessToken.split(".")[1];

    if (!payload) {
      return "HR";
    }

    const decoded = JSON.parse(decodeBase64Url(payload));
    return String(decoded.role || "HR").toUpperCase();
  } catch {
    return "HR";
  }
};

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth } = useAuth();

  const dashboardMeta = useMemo(() => {
    const role = getRoleFromToken(auth?.accessToken);

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
  }, [auth?.accessToken]);

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
