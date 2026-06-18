import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import PersonalDetailsForm from "../components/PersonalDetailsForm";
import EducationalDetails from "../components/EducationalDetails";
import ExperienceDetails from "../components/ExperienceDetails";
import BankDetails from "../components/BankDetails";
import DocumentUpload from "../components/DocumentUpload";
import PolicyAcceptance from "../components/PolicyAcceptance";

import { getEmployeeDashboardStats } from "../services/employeeService";

const Task = () => {
  const [dashboard, setDashboard] = useState(null);

  const sections = [
    {
      key: "Personal Details",
      Component: PersonalDetailsForm,
      disabledWhen: "COMPLETED",
    },
    {
      key: "Education Details",
      Component: EducationalDetails,
      disabledWhen: "COMPLETED",
    },
    {
      key: "Experience Details",
      Component: ExperienceDetails,
      disabledWhen: "COMPLETED",
    },
    {
      key: "Bank Details",
      Component: BankDetails,
      disabledWhen: "COMPLETED",
    },
    {
      key: "Documents Upload",
      Component: DocumentUpload,
      disabledWhen: "LOCKED",
    },
    {
      key: "Policy Acceptance",
      Component: PolicyAcceptance,
      disabledWhen: "LOCKED",
    },
  ];

  const loadDashboard = async () => {
    try {
      const data = await getEmployeeDashboardStats();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const getTaskStatus = (title) => {
    return dashboard?.pendingActions?.find((item) => item.title === title)
      ?.status;
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "COMPLETED":
        return <Chip label="Completed" color="success" size="small" />;

      case "PENDING":
        return <Chip label="Pending" color="warning" size="small" />;

      default:
        return <Chip label="Locked" color="default" size="small" />;
    }
  };

  if (!dashboard) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
            Loading tasks
          </Typography>
          <Typography color="text.secondary">
            Fetching your onboarding progress...
          </Typography>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Card
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          mb: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(14,165,233,0.03))",
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Stack spacing={2.25}>
            <Box>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Employee Onboarding
              </Typography>
              <Typography color="text.secondary">
                Complete all onboarding tasks to get started
              </Typography>
            </Box>

            <Box>
              <LinearProgress
                variant="determinate"
                value={dashboard.profileCompletion}
                sx={{ height: 10, borderRadius: 999 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {dashboard.profileCompletion}% Completed
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Stack spacing={3}>
        {sections.map(({ key, Component, disabledWhen }) => (
          <Box key={key}>
            <Component
              disabled={getTaskStatus(key) === disabledWhen}
              refreshDashboard={loadDashboard}
              {...(key === "Documents Upload"
                ? { documentStatus: dashboard.documentStatus }
                : {})}
              {...(key === "Policy Acceptance"
                ? { policyAccepted: getTaskStatus(key) }
                : {})}
            />
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Task;
