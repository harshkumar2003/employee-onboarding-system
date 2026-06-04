import { useState } from "react";
import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import employeeData from "../data/employeeData.json";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import EmployeeForm from "../components/EmployeeFrom";
import EmployeeGrid from "../components/EmployeeGrid";

const Employee = () => {
  const [employees, setEmployees] = useState(employeeData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: { xs: 2.25, md: 3 },
            border: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.24)",
            bgcolor: "common.white",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
            boxShadow: "0 18px 46px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: -0.4 }}>
                Employees
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Review onboardees, track progress, and add new employees from one place.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.25} alignItems="center">
              <Chip
                label={`${employees.length} active`}
                sx={{
                  bgcolor: "rgba(16, 185, 129, 0.12)",
                  color: "#047857",
                  fontWeight: 700,
                }}
              />
              <Button name="Add Employee" onClick={() => setIsFormOpen(true)} />
            </Stack>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 2,
            border: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.24)",
            bgcolor: "rgba(255,255,255,0.9)",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.05)",
          }}
        >
          <SearchBar />
        </Paper>
      </Grid>

      {isFormOpen && (
        <EmployeeForm
          onClose={() => setIsFormOpen(false)}
          onAddEmployee={handleAddEmployee}
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EmployeeGrid employees={employees} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Employee;
