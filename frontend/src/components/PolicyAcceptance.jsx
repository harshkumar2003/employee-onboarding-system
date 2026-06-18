import { useState } from "react";
import {
  Paper,
  Box,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  Alert,
  Typography,
  Divider,
} from "@mui/material";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { policyAccept } from "../services/employeeService";
import StepHeader from "./StepHeader";
import {
  gradientBarSx,
  cardSx,
  primaryButtonSx,
  sectionCardSx,
  helperTitleSx,
  helperTextSx,
} from "./formStyles";

const PolicyAcceptance = ({
  disabled,
  refreshDashboard,
  policyAccepted,
  step = 6,
}) => {
  const [formData, setFormData] = useState({
    ndaAccepted: false,
    companyPolicyAccepted: false,
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.ndaAccepted ||
      !formData.companyPolicyAccepted ||
      !formData.termsAccepted
    ) {
      toast.error("Please accept all policies before continuing");
      return;
    }

    try {
      setLoading(true);

      const response = await policyAccept(formData);

      toast.success(response || "Policies accepted successfully");

      if (refreshDashboard) {
        await refreshDashboard();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to accept policies"
      );
    } finally {
      setLoading(false);
    }
  };

  const isCompleted =
    policyAccepted === "COMPLETED" ||
    policyAccepted === "Policy Accepted" ||
    policyAccepted === true;

  // SUCCESS STATE
  if (isCompleted) {
    return (
      <Paper elevation={0} sx={cardSx}>
        <Box sx={gradientBarSx} />

        <Box sx={{ p: { xs: 2.5, md: 4 } }}>
          <StepHeader
            step={step}
            title="Policy Acceptance"
            description="Review and accept all company policies."
            status="completed"
            icon={ShieldCheck}
            iconBg="#dcfce7"
            iconColor="#16a34a"
          />

          <Alert severity="success" sx={{ borderRadius: 2 }}>
            All policies have been accepted successfully.
          </Alert>
        </Box>
      </Paper>
    );
  }

  // LOCKED STATE
  if (disabled) {
    return (
      <Paper elevation={0} sx={cardSx}>
        <Box sx={gradientBarSx} />

        <Box sx={{ p: { xs: 2.5, md: 4 }, opacity: 0.75 }}>
          <StepHeader
            step={step}
            title="Policy Acceptance"
            description="Complete previous steps to unlock this section."
            status="locked"
            icon={ShieldCheck}
            iconBg="#ede9fe"
            iconColor="#7c3aed"
          />

          <Alert severity="info">This step is currently locked.</Alert>
        </Box>
      </Paper>
    );
  }

  // FORM STATE
  return (
    <Paper elevation={0} sx={cardSx}>
      <Box sx={gradientBarSx} />

      <Box sx={{ p: { xs: 2.5, md: 4 } }}>
        <StepHeader
          step={step}
          title="Policy Acceptance"
          description="Review and accept all company policies."
          status="active"
          icon={ShieldCheck}
          iconBg="#ede9fe"
          iconColor="#7c3aed"
        />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box sx={sectionCardSx}>
              <Typography sx={{ ...helperTitleSx, mb: 0.35 }}>
                Final confirmation
              </Typography>
              <Typography color="text.secondary" sx={helperTextSx}>
                Tick all items before submitting.
              </Typography>
            </Box>

            <Divider />

            <Stack spacing={1.5}>
              <FormControlLabel
                sx={{
                  m: 0,
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "#fff",
                  alignItems: "flex-start",
                }}
                control={
                  <Checkbox
                    name="ndaAccepted"
                    checked={formData.ndaAccepted}
                    onChange={handleChange}
                    sx={{ mt: -0.5 }}
                  />
                }
                label="I accept the Non-Disclosure Agreement (NDA)"
              />

              <FormControlLabel
                sx={{
                  m: 0,
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "#fff",
                  alignItems: "flex-start",
                }}
                control={
                  <Checkbox
                    name="companyPolicyAccepted"
                    checked={formData.companyPolicyAccepted}
                    onChange={handleChange}
                    sx={{ mt: -0.5 }}
                  />
                }
                label="I have read and accept the Company Policies"
              />

              <FormControlLabel
                sx={{
                  m: 0,
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "#fff",
                  alignItems: "flex-start",
                }}
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    sx={{ mt: -0.5 }}
                  />
                }
                label="I agree to the Terms & Conditions"
              />
            </Stack>

            <Alert severity="info" sx={{ borderRadius: 2 }}>
              These acknowledgements are required before your onboarding can be
              completed.
            </Alert>
          </Stack>

          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={primaryButtonSx}
            >
              {loading ? "Submitting..." : "Accept Policies"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PolicyAcceptance;
