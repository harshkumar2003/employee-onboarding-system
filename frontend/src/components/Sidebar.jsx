import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
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

const Sidebar = ({ mobileOpen, onClose, onMenuClick }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const username = "Harsh Kumar";

  const navItems = [
    { name: "Dashboard", path: "/dashboard", Icon: LayoutDashboard },
    { name: "Employee", path: "/dashboard/employee", Icon: Users },
    { name: "Task", path: "/dashboard/task", Icon: ClipboardList },
    { name: "Doc Review", path: "/dashboard/doc", Icon: ShieldCheck },
    { name: "Settings", path: "/dashboard/settings", Icon: Settings },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const drawerContent = (
    <Box
      sx={{
        width: 292,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0f172a",
        color: "common.white",
        backgroundImage:
          "radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 24%), linear-gradient(180deg, #0f172a 0%, #0b1220 100%)",
      }}
    >
      <Stack
        spacing={1.5}
        sx={{
          px: 2.5,
          py: 2.5,
          borderBottom: "1px solid",
          borderColor: "rgba(148, 163, 184, 0.16)",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box
            component="img"
            src="/logo-1.png"
            alt="logo"
            sx={{ width: 126, height: "auto", objectFit: "contain" }}
          />

          {!isDesktop && (
            <IconButton onClick={onClose} sx={{ color: "common.white" }}>
              <X />
            </IconButton>
          )}
        </Stack>

        <Chip
          label="Onboarding Hub"
          size="small"
          sx={{
            width: "fit-content",
            bgcolor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.86)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

      </Stack>

      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {navItems.map((item) => {
          const Icon = item.Icon;

          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={onClose}
              sx={{
                mb: 1,
                borderRadius: 3,
                color: "rgba(226, 232, 240, 0.85)",
                "&.active": {
                  bgcolor: "#122143",
                  color: "common.white",
                },
                "&:hover": {
                  bgcolor: "rgba(148, 163, 184, 0.12)",
                  color: "common.white",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                <Icon size={18} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.2)" }} />

      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 38, height: 38, bgcolor: "#2563eb", fontWeight: 700, boxShadow: "0 8px 18px rgba(37, 99, 235, 0.3)" }}>
            {username.charAt(0)}
          </Avatar>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flex: 1 }}>
            <Box>
              <Typography variant="body2" fontWeight={700}>
                {username}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(226, 232, 240, 0.68)" }}>
                HR Administrator
              </Typography>
            </Box>

            <IconButton
              onClick={handleLogout}
              sx={{
                color: "#fecaca",
                bgcolor: "rgba(248, 113, 113, 0.12)",
                "&:hover": { bgcolor: "rgba(248, 113, 113, 0.2)" },
              }}
            >
              <LogOut />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      {!isDesktop && (
        <IconButton
          onClick={onMenuClick}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#0f172a",
            color: "common.white",
            boxShadow: "0 12px 28px rgba(15, 23, 42, 0.2)",
            "&:hover": { bgcolor: "#1e293b" },
          }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop ? true : mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 292,
            boxSizing: "border-box",
            borderRight: "none",
            bgcolor: "#0f172a",
            boxShadow: "14px 0 36px rgba(15, 23, 42, 0.16)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
