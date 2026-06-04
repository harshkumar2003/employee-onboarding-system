import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <Navbar onMenuClick={() => setMobileOpen(true)} />
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
