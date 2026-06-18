import { useState } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { GraduationCap } from "lucide-react";
import toast from "react-hot-toast";
import { saveEducationDetails } from "../services/employeeService";
import StepHeader from "./StepHeader";
import {
  gradientBarSx,
  cardSx,
  inputSx,
  primaryButtonSx,
} from "./formStyles";

const EducationalDetails = ({
  disabled,
  refreshDashboard,
  step = 2,
  status,
}) => {
  const [formData, setFormData] = useState({
    qualification: "",
    institutionName: "",
    boardUniversity: "",
    specialization: "",
    passingYear: "",
    percentageCgpa: "",
  });

  const [loading, setLoading] = useState(false);

  const qualifications = [
    "TENTH",
    "TWELFTH",
    "GRADUATION",
    "POST_GRADUATION",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      qualification: "",
      institutionName: "",
      boardUniversity: "",
      specialization: "",
      passingYear: "",
      percentageCgpa: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await saveEducationDetails(formData);

      toast.success("Education Added Successfully");

      resetForm();

      if (refreshDashboard) {
        await refreshDashboard();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
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
          title="Educational Details"
          description="Add the academic details that complete your profile."
          status={resolvedStatus}
          icon={GraduationCap}
          iconBg="#dbeafe"
          iconColor="#2563eb"
        />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Divider />

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={disabled}
                  select
                  required
                  fullWidth
                  label="Qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  helperText="Select the level you want to record"
                  sx={inputSx}
                >
                  {qualifications.map((qualification) => (
                    <MenuItem
                      key={qualification}
                      value={qualification}
                    >
                      {qualification.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Institution Name"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="School, College, or University"
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Board / University"
                  name="boardUniversity"
                  value={formData.boardUniversity}
                  onChange={handleChange}
                  placeholder="Board or University Name"
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  type="number"
                  label="Passing Year"
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleChange}
                  inputProps={{
                    min: 1900,
                    max: new Date().getFullYear() + 1,
                  }}
                  placeholder="2024"
                  sx={inputSx}
                />
              </Grid>

              {["GRADUATION", "POST_GRADUATION"].includes(
                formData.qualification
              ) && (
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled={disabled}
                    required={
                      formData.qualification === "POST_GRADUATION"
                    }
                    fullWidth
                    label="Specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Major, Stream, or Focus Area"
                    sx={inputSx}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <TextField
                  disabled={disabled}
                  required
                  fullWidth
                  label="Percentage / CGPA"
                  name="percentageCgpa"
                  value={formData.percentageCgpa}
                  onChange={handleChange}
                  placeholder="Percentage or CGPA"
                  sx={inputSx}
                />
              </Grid>
            </Grid>
          </Stack>

          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ mt: 4 }}
          >
            <Button
              disabled={disabled || loading}
              type="submit"
              variant="contained"
              sx={primaryButtonSx}
            >
              {loading
                ? "Saving..."
                : disabled
                ? "PENDING"
                : "Add Education"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default EducationalDetails;