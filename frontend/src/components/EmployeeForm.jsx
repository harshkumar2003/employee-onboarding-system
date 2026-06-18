import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { X } from "lucide-react";

const EmployeeForm = ({ onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfJoining: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validation = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Minimum 3 characters required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Only letters are allowed";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone no is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    const today = new Date().toISOString().split("T")[0];

    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = "Joining date is required";
    } else if (formData.dateOfJoining < today) {
      newErrors.dateOfJoining = "Joining date cannot be in the past";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validation();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  await onAddEmployee({
    fullName: formData.fullName,
    email: formData.email,
    phoneNumber: formData.phone,
    joiningDate: formData.dateOfJoining,
  });
};

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="sm"
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
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
          color: "common.white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ letterSpacing: 1.1, opacity: 0.85, lineHeight: 1.2 }}>
            New Onboardee
          </Typography>
          <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.1 }}>
            Add Employee
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

      <DialogContent sx={{ px: 2.5, pt: 2.5 }}>
        <Stack component="form" onSubmit={handleSubmit} spacing={1.75}>
          <Stack spacing={0.75}>
            <Typography variant="body2" fontWeight={700}>
              Full Name
            </Typography>
            <TextField
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
              error={Boolean(errors.fullName)}
              helperText={errors.fullName || " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  backgroundColor: "#f8fafc",
                },
              }}
            />
          </Stack>

          <Stack spacing={0.75}>
            <Typography variant="body2" fontWeight={700}>
              Email
            </Typography>
            <TextField
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email || " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  backgroundColor: "#f8fafc",
                },
              }}
            />
          </Stack>

          <Stack spacing={0.75}>
            <Typography variant="body2" fontWeight={700}>
              Phone Number
            </Typography>
            <TextField
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
              error={Boolean(errors.phone)}
              helperText={errors.phone || " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  backgroundColor: "#f8fafc",
                },
              }}
            />
          </Stack>

          <Stack spacing={0.75}>
            <Typography variant="body2" fontWeight={700}>
              Date of Joining
            </Typography>
            <TextField
              name="dateOfJoining"
              type="date"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split("T")[0] }}
              error={Boolean(errors.dateOfJoining)}
              helperText={errors.dateOfJoining || " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  backgroundColor: "#f8fafc",
                },
              }}
            />
          </Stack>

          <DialogActions sx={{ px: 0, pt: 1.25, pb: 0.5 }}>
            <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderRadius: 2.5, textTransform: "none", px: 2.25 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 2.5,
                textTransform: "none",
                px: 2.5,
                background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
              }}
            >
              Add Employee
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
