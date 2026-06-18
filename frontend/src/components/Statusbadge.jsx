import { Box, Typography } from "@mui/material";
import { Lock, CheckCircle2, Circle } from "lucide-react";

const STATUS_CONFIG = {
  locked: { bg: "#f3f4f6", color: "#6b7280", icon: Lock, label: "Locked" },
  active: { bg: "#dbeafe", color: "#2563eb", icon: Circle, label: "Active" },
  completed: {
    bg: "#dcfce7",
    color: "#16a34a",
    icon: CheckCircle2,
    label: "Completed",
  },
};

const StatusBadge = ({ status = "active" }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  const Icon = config.icon;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        bgcolor: config.bg,
        color: config.color,
        px: 0.95,
        py: 0.25,
        borderRadius: "999px",
        flexShrink: 0,
      }}
    >
      <Icon size={11} strokeWidth={2.5} />
      <Typography sx={{ fontSize: 10.5, fontWeight: 700 }}>
        {config.label}
      </Typography>
    </Box>
  );
};

export default StatusBadge;
