import { Box, Typography } from "@mui/material";
import StatusBadge from "./Statusbadge";
import { eyebrowSx } from "./formStyles";

const StepHeader = ({
  step,
  title,
  description,
  status,
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ ...eyebrowSx, fontSize: 10.5, letterSpacing: "1.4px" }}>
          Step {String(step).padStart(2, "0")}
        </Typography>

        <StatusBadge status={status} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.75,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "14px",
            bgcolor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
          }}
        >
          <Icon size={18} color={iconColor} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: 20, md: 24 },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 0.4,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              lineHeight: 1.5,
              maxWidth: 620,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StepHeader;
