import { Box, Paper, Stack, Typography, Grid, Chip } from "@mui/material";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getHrDashboardStats } from "../services/hrService";
import { getAdminDashboardStats } from "../services/adminService";
import { getEmployeeDashboardStats } from "../services/employeeService";
import { ClipboardList, FileText } from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
const Dashboard = () => {
  const { role } = useAuth();
  const [cards, setCards] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [documentStatus, setDocumentStatus] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        if (role === "HR") {
          const data = await getHrDashboardStats();

          setCards([
            {
              id: 1,
              title: "Total Employees",
              value: data.totalEmployees,
              description: "Registered employees",
            },
            {
              id: 2,
              title: "Pending Verifications",
              value: data.pendingVerifications,
              description: "Awaiting HR review",
            },
            {
              id: 3,
              title: "Completed Onboarding",
              value: data.completedOnboarding,
              description: "Successfully onboarded",
            },
            {
              id: 4,
              title: "Active Onboardees",
              value: data.activeOnboardees,
              description: "Currently in onboarding",
            },
          ]);
        }

        if (role === "ADMIN") {
          const data = await getAdminDashboardStats();

          setCards([
            {
              id: 1,
              title: "Total Employees",
              value: data.totalEmployee,
              description: "All employees",
            },
            {
              id: 2,
              title: "Total HRs",
              value: data.totalHR,
              description: "Registered HR users",
            },
            {
              id: 3,
              title: "Total Admins",
              value: data.totalAdmin,
              description: "System administrators",
            },
          ]);
        }
        if (role == "EMPLOYEE") {
          const data = await getEmployeeDashboardStats();
          setCards([
            {
              id: 1,
              title: "Profile Completion",
              value: `${data.profileCompletion}%`,
              description: "Personal details completed",
            },
            {
              id: 2,
              title: "Documents Uploaded",
              value: `${data.documentsUpload} / 7`,
              description: "Awaiting verification",
            },
            {
              id: 3,
              title: "Verified Documents",
              value: data.verifiedDocuments,
              description: "Approved by HR",
            },
            {
              id: 4,
              title: "Onboarding Tasks",
              value: `${data.onboardingTask} / ${data.totalTask}`,
              description: "In Progress",
            },
          ]);
          setPendingActions(data.pendingActions);
          setDocumentStatus(data.documentStatus);
        }
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, [role]);

  return (
    <Stack spacing={3.25}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          p: { xs: 2.5, md: 3.25 },
          border: "1px solid",
          borderColor: "rgba(148, 163, 184, 0.24)",
          bgcolor: "common.white",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.98) 100%)",
          boxShadow: "0 18px 46px rgba(15, 23, 42, 0.06)",
        }}
      >
        <Typography
          variant="body2"
          fontWeight={700}
          color="primary.main"
          letterSpacing={1}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 0.75,
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: -0.6,
          }}
        >
          Hi, {name}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>

        <Box
          sx={{
            mt: 2,
            width: 92,
            height: 5,
            borderRadius: 999,
            background: "linear-gradient(90deg, #1d4ed8 0%, #0ea5e9 100%)",
          }}
        />
      </Paper>

      <Grid container spacing={3} justifyContent="center">
        {cards.map((item) => (
          <Grid
            key={item.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              title={item.title}
              value={item.value}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container rowSpacing={2} spacing={2}>
        <EmployeeCard
          title="Pending Actions"
          icon={<ClipboardList size={18} color="#2563eb" />}
        >
          {pendingActions.map((action, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                borderBottom:
                  index !== pendingActions.length - 1
                    ? "1px solid #e2e8f0"
                    : "none",
              }}
            >
              <Typography fontWeight={500}>{action.title}</Typography>

              <Chip
                label={action.status}
                size="small"
                color={
                  action.status === "COMPLETED"
                    ? "success"
                    : action.status === "PENDING"
                      ? "warning"
                      : "default"
                }
              />
            </Box>
          ))}
        </EmployeeCard>
        <EmployeeCard
          title="Document Status"
          icon={<FileText size={18} color="#2563eb" />}
        >
          {documentStatus.map((doc, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                borderBottom:
                  index !== documentStatus.length - 1
                    ? "1px solid #e2e8f0"
                    : "none",
              }}
            >
              <Typography fontWeight={500}>{doc.documentType}</Typography>

              <Chip
                label={doc.status}
                size="small"
                sx={{
                  bgcolor: doc.status === "APPROVED" ? "#dcfce7" : "#ffedd5",
                  color: doc.status === "APPROVED" ? "#15803d" : "#ea580c",
                  fontWeight: 600,
                }}
              />
            </Box>
          ))}
        </EmployeeCard>
      </Grid>
    </Stack>
  );
};

export default Dashboard;
