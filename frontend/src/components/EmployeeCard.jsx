import { Paper, Typography, Box } from "@mui/material";

const EmployeeCard = ({ title, icon, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "#e2e8f0",
        background: "#fff",
        minHeight: 300,
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "#dbeafe",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default EmployeeCard;