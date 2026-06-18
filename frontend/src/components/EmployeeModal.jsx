import {
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { X } from "lucide-react";

const EmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  const employeeId = employee.employee_id ?? employee.id ?? "N/A";
  const fullName = employee.fullName ?? employee.name ?? "N/A";
  const email = employee.email ?? "N/A";
  const phone = employee.phone_no ?? employee.phone ?? "N/A";
  const joiningDate = employee.joiningDate ?? employee.dateOfJoining ?? "N/A";
  const status = employee.status ?? "N/A";
  const active =
    typeof employee.active === "boolean"
      ? employee.active
        ? "Active"
        : "Inactive"
      : "N/A";

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
          px: 2.5,
          py: 1.75,
          background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
          color: "common.white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ letterSpacing: 1.1, opacity: 0.85, lineHeight: 1.2 }}>
            Employee Profile
          </Typography>
          <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.1 }}>
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

      <DialogContent sx={{ px: 2.5, py: 2.5 }}>
        <Stack spacing={1.75}>
          

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Name
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {fullName}
            </Typography>
          </Stack>

          <Divider flexItem />

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {email}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {phone}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Joining Date
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {joiningDate}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={status}
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
