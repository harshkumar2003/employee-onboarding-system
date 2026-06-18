import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";

const DocumentsModal = ({ open, onClose, document, onApprove, onReject }) => {
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    setRemarks(document?.remarks || "");
  }, [document]);

  const handleApprove = () => {
    onApprove(document.documentId);
  };

  const handleReject = () => {
    if (!remarks.trim()) {
      alert("Remarks are required");
      return;
    }

    onReject(document.documentId, remarks);
  };

  if (!document) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Verify {document.documentType}</DialogTitle>

      <DialogContent>
        {document.fileUrl?.toLowerCase().includes(".pdf") ? (
          <Box
            component="iframe"
            src={document.fileUrl}
            sx={{
              width: "100%",
              height: 500,
              border: "none",
              mb: 2,
            }}
          />
        ) : (
          <Box
            component="img"
            src={document.fileUrl}
            alt={document.documentType}
            sx={{
              width: "100%",
              maxHeight: 500,
              objectFit: "contain",
              mb: 2,
            }}
          />
        )}

        <TextField
          fullWidth
          multiline
          rows={1}
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" color="error" onClick={handleReject}>
          Reject
        </Button>

        <Button variant="contained" color="success" onClick={handleApprove}>
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentsModal;
