import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Menu, Bell } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.22)",
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
              HR Dashboard
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Manage onboarding with clarity and speed
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          
          <IconButton
            color="inherit"
            sx={{
              bgcolor: "rgba(15, 23, 42, 0.04)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              "&:hover": { bgcolor: "rgba(15, 23, 42, 0.08)" },
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
