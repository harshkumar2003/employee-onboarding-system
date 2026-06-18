import { Box, Paper, Stack, Typography } from "@mui/material";

const OnboardingSectionCard = ({
  step,
  title,
  description,
  statusChip,
  icon,
  iconBg,
  iconColor,
  children,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.22)",
        bgcolor: "rgba(255,255,255,0.96)",
        boxShadow: "0 18px 46px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Box
        sx={{
          height: 4,
          background:
            "linear-gradient(90deg, rgba(37, 99, 235, 1) 0%, rgba(14, 165, 233, 1) 100%)",
        }}
      />

      <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: iconBg,
                color: iconColor,
                flexShrink: 0,
              }}
            >
              {icon}
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "text.secondary",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Step {step}
              </Typography>

              <Typography variant="h6" fontWeight={800} sx={{ mt: 0.25 }}>
                {title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Stack>

          {statusChip}
        </Stack>

        {children}
      </Box>
    </Paper>
  );
};

export default OnboardingSectionCard;
