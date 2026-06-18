import { useState } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Stack,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { Landmark } from "lucide-react";
import toast from "react-hot-toast";
import { saveBankDetails } from "../services/employeeService";
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

const BankDetails = ({ disabled, refreshDashboard, step = 4, status }) => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "ifscCode" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await saveBankDetails(formData);

      toast.success("Bank Details Saved Successfully");

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

  const resolvedStatus = status || (disabled ? "locked" : "active");

  return (
    <Paper elevation={0} sx={cardSx}>
      <Box sx={gradientBarSx} />

      <Box sx={{ p: { xs: 2.5, md: 4 } }}>
        <StepHeader
          step={step}
          title="Bank Details"
          description="Provide payroll details securely for salary processing."
          status={resolvedStatus}
          icon={Landmark}
          iconBg="#dcfce7"
          iconColor="#16a34a"
        />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            

            <Divider />

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  fullWidth
                  required
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="Name on the bank account"
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  fullWidth
                  required
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Bank name"
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  fullWidth
                  required
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Account number"
                  sx={inputSx}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled={disabled}
                  fullWidth
                  required
                  label="IFSC Code"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="ABCD0123456"
                  inputProps={{ maxLength: 11 }}
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

export default BankDetails;
