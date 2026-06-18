import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { approveDocuments, getPendingDocumets } from "../services/hrService";
import DocumentsGrid from "../components/DocumentsGrid";
import DocumentsModal from "../components/DocumentsModal";

const DocReview = () => {
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPendingDocumets();
        setDocuments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleView = (document) => {
    setSelectedDocument(document);
    setOpen(true);
  };

  const handleApprove = async (documentId) => {
  await approveDocuments(documentId, {
    status: "APPROVED",
  });

  setOpen(false);
};


  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        Doc Review Page
      </Typography>

      <DocumentsGrid documents={documents} onActionClick={handleView} />
      <DocumentsModal
        open={open}
        document={selectedDocument}
        onClose={() => setOpen(false)}
        onApprove={handleApprove}
        // onReject={handleReject}
      />
    </Paper>
  );
};

export default DocReview;
