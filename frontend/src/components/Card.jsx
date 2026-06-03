import { Box, Paper, Stack, Typography } from "@mui/material";
import { Users, CircleAlert, CircleCheckBig, Activity } from "lucide-react";

const Card = ({ title, value, change, description }) => {
  const iconMap = {
    "Total Employees": <Users size={18} />,
    "Pending Verifications": <CircleAlert size={18} />,
    "Completed Onboarding": <CircleCheckBig size={18} />,
    "Active Onboardees": <Activity size={18} />,
  };

  const colorMap = {
    "Total Employees": { color: "#2563eb", bg: "#dbeafe" },
    "Pending Verifications": { color: "#f97316", bg: "#ffedd5" },
    "Completed Onboarding": { color: "#059669", bg: "#d1fae5" },
    "Active Onboardees": { color: "#7c3aed", bg: "#ede9fe" },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        px: 2.25,
        py: 2.25,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.28)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
          borderColor: "rgba(37, 99, 235, 0.22)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colorMap[title]?.color ?? "primary.main",
            backgroundColor: colorMap[title]?.bg ?? "#eff6ff",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
          }}
        >
          {iconMap[title]}
        </Box>

        <Box
          sx={{
            px: 1.4,
            py: 0.55,
            borderRadius: 999,
            bgcolor: "rgba(16, 185, 129, 0.12)",
            color: "#047857",
            fontSize: "0.8rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {change}
        </Box>
      </Stack>

      <Typography variant="h4" component="h1" sx={{ mt: 3, fontWeight: 800, color: colorMap[title]?.color }}>
        {value}
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 0.75, fontWeight: 700, color: "text.primary" }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default Card;
