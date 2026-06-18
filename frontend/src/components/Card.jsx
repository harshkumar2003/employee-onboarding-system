import { Box, colors, Paper, Stack, Typography } from "@mui/material";
import {
  Users,
  CircleAlert,
  CircleCheckBig,
  Activity,
  UserCog,
  ShieldCheck,
  FileText, 
  BadgeCheck, 
  ClipboardList,
} from "lucide-react";

const Card = ({ title, value, description }) => {
  const iconMap = {
    "Total Employees": <Users size={18} />,
    "Pending Verifications": <CircleAlert size={18} />,
    "Completed Onboarding": <CircleCheckBig size={18} />,
    "Active Onboardees": <Activity size={18} />,

    // Admin Cards
    "Total HRs": <UserCog size={18} />,
    "Total Admins": <ShieldCheck size={18} />,

    "Profile Completion":<Users size={18}/>,
    "Documents Uploaded":<FileText size={18}/>,
    "Verified Documents":<BadgeCheck size={18}/>,
    "Onboarding Tasks":<ClipboardList size={18}/>

  };

  const colorMap = {
    "Total Employees": { color: "#2563eb", bg: "#dbeafe" },
    "Pending Verifications": { color: "#f97316", bg: "#ffedd5" },
    "Completed Onboarding": { color: "#059669", bg: "#d1fae5" },
    "Active Onboardees": { color: "#7c3aed", bg: "#ede9fe" },

    // Admin Cards
    "Total HRs": { color: "#7c3aed", bg: "#ede9fe" },
    "Total Admins": { color: "#dc2626", bg: "#fee2e2" },

    "Profile Completion":{color: "#2563eb", bg: "#dbeafe"},
    "Documents Uploaded":{color: "#7c3aed" , bg: "#ede9fe"},
    "Verified Documents":{color: "#059669" , bg : "#d1fae5"},
    "Onboarding Tasks": {color: "#f97316" , bg: "#ffedd5"},

  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        px: 2.25,
        py: 2.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.28)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
          borderColor: "rgba(37, 99, 235, 0.22)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
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
      </Stack>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 3,
          fontWeight: 800,
          color: colorMap[title]?.color,
        }}
      >
        {value}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mt: 0.75,
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color: "text.secondary",
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

export default Card;