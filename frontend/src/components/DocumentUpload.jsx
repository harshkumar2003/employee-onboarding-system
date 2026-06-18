import { useRef, useState } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { FileText } from "lucide-react";
import toast from "react-hot-toast";
import { uploadDocument } from "../services/employeeService";
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

const DocumentUpload = ({
  disabled,
  refreshDashboard,
  documentStatus = [],
  step = 5,
  status,
}) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    documentType: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const documentTypes = [
    { value: "AADHAR", label: "Aadhar Card" },
    { value: "PAN", label: "PAN Card" },
    { value: "RESUME", label: "Resume" },
    { value: "PHOTO", label: "Passport Photo" },
    { value: "TENTH", label: "10th Marksheet" },
    { value: "TWELFTH", label: "12th Marksheet" },
    { value: "DEGREE_CERTIFICATE", label: "Degree Certificate" },
  ];

  const uploadedDocuments = documentStatus.map((doc) => doc.documentType);

  const availableDocumentTypes = documentTypes.filter(
    (doc) => !uploadedDocuments.includes(doc.value),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const resetForm = () => {
    setFormData({
      documentType: "",
      file: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.documentType) {
      toast.error("Please select document type");
      return;
    }

    if (!formData.file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("documentType", formData.documentType);
      data.append("file", formData.file);

      const response = await uploadDocument(data);

      toast.success(response || "Document Uploaded Successfully");

      resetForm();

      if (refreshDashboard) {
        await refreshDashboard();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Upload failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const allUploaded = availableDocumentTypes.length === 0;
  const resolvedStatus =
    status || (allUploaded ? "completed" : disabled ? "locked" : "active");

  return (
    <Paper elevation={0} sx={cardSx}>
      <Box sx={gradientBarSx} />

      <Box sx={{ p: { xs: 2.5, md: 4 } }}>
        <StepHeader
          step={step}
          title="Document Upload"
          description="Upload each required document once to complete onboarding."
          status={resolvedStatus}
          icon={FileText}
          iconBg="#ede9fe"
          iconColor="#7c3aed"
        />

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            

            <Divider />

            {allUploaded ? (
              <Alert severity="success" sx={{ borderRadius: 2 }}>
                All required documents have been uploaded.
              </Alert>
            ) : (
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    required
                    fullWidth
                    disabled={disabled}
                    label="Document Type"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    helperText="Choose the document you want to upload"
                    sx={inputSx}
                  >
                    {availableDocumentTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    disabled={disabled}
                    sx={{
                      minHeight: 46,
                      justifyContent: "flex-start",
                      borderRadius: "12px",
                      borderColor: "#dbe4f0",
                      color: formData.file ? "text.primary" : "text.secondary",
                      bgcolor: "#fff",
                      px: 1.75,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {formData.file ? formData.file.name : "Choose File"}
                    <input
                      ref={fileInputRef}
                      hidden
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
              </Grid>
            )}

            
          </Stack>

          {!allUploaded && (
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={disabled || loading}
                sx={primaryButtonSx}
              >
                {loading
                  ? "Uploading..."
                  : disabled
                    ? "Locked"
                    : "Upload Document"}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default DocumentUpload;
