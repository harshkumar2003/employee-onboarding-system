import { useState } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { saveExperienceDetails } from "../services/employeeService";
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

const ExperienceDetails = ({
  disabled,
  refreshDashboard,
  compact = false,
  step = 3,
  status,
}) => {
  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    const { checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      currentlyWorking: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      designation: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      location: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await saveExperienceDetails(formData);

      toast.success("Experience Added Successfully");

      resetForm();
      await refreshDashboard();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        

        <Divider />

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              disabled={disabled}
              required
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Previous employer"
              sx={inputSx}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              disabled={disabled}
              required
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Job title"
              sx={inputSx}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              disabled={disabled}
              required
              fullWidth
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={inputSx}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              disabled={disabled || formData.currentlyWorking}
              required={!formData.currentlyWorking}
              fullWidth
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
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
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              sx={inputSx}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="center">
            <Box
              sx={{
                width: "100%",
                p: 2,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#fff",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="currentlyWorking"
                    checked={formData.currentlyWorking}
                    onChange={handleCheckbox}
                    disabled={disabled}
                  />
                }
                label="I currently work here"
              />
            </Box>
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
          {disabled ? "Completed" : "Add Experience"}
        </Button>
      </Box>
    </Box>
  );

  if (compact) {
    return content;
  }

  const resolvedStatus = status || (disabled ? "locked" : "active");

  return (
    <Paper elevation={0} sx={cardSx}>
      <Box sx={gradientBarSx} />

      <Box sx={{ p: { xs: 2.5, md: 4 } }}>
        <StepHeader
          step={step}
          title="Experience Details"
          description="Add your previous work history and current role status."
          status={resolvedStatus}
          icon={Briefcase}
          iconBg="#fef9c3"
          iconColor="#a16207"
        />

        {content}
      </Box>
    </Paper>
  );
};

export default ExperienceDetails;
