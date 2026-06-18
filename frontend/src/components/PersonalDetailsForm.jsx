import { useState } from "react";
import { savePersonalDetails } from "../services/employeeService";
import toast from "react-hot-toast";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { User } from "lucide-react";
import StepHeader from "./StepHeader";
import {
  gradientBarSx,
  cardSx,
  inputSx,
  primaryButtonSx,
  sectionCardSx,
  helperTitleSx,
  helperTextSx,
} from "./formStyles";

const PersonalDetailsForm = ({
  disabled,
  refreshDashboard,
  step = 1,
  status,
}) => {
  const [formData, setFormData] = useState({
    dob: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    emergencyContactNumber: "",
    yearsOfExperience: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "yearsOfExperience" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await savePersonalDetails(formData);
      toast.success(data);
      await refreshDashboard();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resolvedStatus = status || (disabled ? "locked" : "active");

  return (
    <Paper elevation={0} sx={cardSx}>
      <Box sx={gradientBarSx} />

      <Box sx={{ p: { xs: 2.5, md: 4 } }}>
        <StepHeader
          step={step}
          title="Personal Details"
          description="Your basic personal and address information."
          status={resolvedStatus}
          icon={User}
          iconBg="#dbeafe"
          iconColor="#2563eb"
        />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
           

            <Divider />

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Address Line 1"
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  fullWidth
                  label="Address Line 2"
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="City"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="State"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Postal Code"
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Emergency Contact Number"
                  type="text"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Years Of Experience"
                  type="text"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={inputSx}
                />
              </Grid>
            </Grid>
          </Stack>

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
            <Button
              disabled={disabled || loading}
              type="submit"
              variant="contained"
              sx={primaryButtonSx}
            >
              {disabled ? "Completed" : "Save & Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PersonalDetailsForm;
