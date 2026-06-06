import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Bell, Menu } from "lucide-react";

const Navbar = ({
  onMenuClick,
  title = "Dashboard",
  subtitle = "Manage onboarding with clarity and speed",
  accent = "#1d4ed8",
  softAccent = "rgba(29, 78, 216, 0.08)",
  iconBg = "rgba(29, 78, 216, 0.12)",
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: softAccent,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 76, px: { xs: 2, md: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {onMenuClick && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onMenuClick}
              sx={{ display: { md: "none" } }}
            >
              <Menu />
            </IconButton>
          )}
          <Box>
            <Typography variant="h6" component="h1" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <IconButton
            color="inherit"
            sx={{
              bgcolor: iconBg,
              border: `1px solid ${softAccent}`,
              color: accent,
              "&:hover": { bgcolor: softAccent },
            }}
          >
            <Bell />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
