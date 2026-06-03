import {
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { X } from "lucide-react";

const EmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.18)",
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.25,
          background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
          color: "common.white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ letterSpacing: 1.2, opacity: 0.85 }}>
            Employee Profile
          </Typography>
          <Typography variant="h5" fontWeight={800} sx={{ lineHeight: 1.1 }}>
            Employee Details
          </Typography>
        </Box>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "common.white",
            bgcolor: "rgba(255,255,255,0.12)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          <X />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <Stack spacing={2.25}>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Employee ID
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              #{employee.id}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Name
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {employee.name}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Joining Date
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {employee.joiningDate}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={employee.status}
              sx={{
                width: "fit-content",
                borderRadius: 999,
                fontWeight: 700,
                bgcolor: "rgba(37, 99, 235, 0.12)",
                color: "#1d4ed8",
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;
