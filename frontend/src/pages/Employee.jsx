import { useState } from "react";
import {  Grid, Paper, Typography } from "@mui/material";
import employeeData from "../data/employeeData.json";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import EmployeeForm from "../components/EmployeeFrom";
import EmployeeGrid from "../components/EmployeeGrid";

const Employee = () => {
  const [employees, setEmployees] = useState(employeeData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };
  const filteredEmployees = employees.filter(
  (employee) =>
    employee.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    employee.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3,
            border: "1px solid rgba(148, 163, 184, 0.24)",
            bgcolor: "common.white",
          }}
        >
          <Grid container alignItems="center">
            <Grid size="grow">
              <Typography variant="h5" fontWeight={800}>
                Employees
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Review onboardees, track progress, and add new employees from
                one place.
              </Typography>
            </Grid>

            <Grid>
              <Button name="Add Employee" onClick={() => setIsFormOpen(true)} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Search Bar - New Line */}
      <Grid size={12}>
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </Grid>

      {/* Employee Grid */}
      <Grid size={12}>
        <Paper elevation={0}>
          <EmployeeGrid employees={filteredEmployees} />
        </Paper>
      </Grid>

      {isFormOpen && (
        <EmployeeForm
          onClose={() => setIsFormOpen(false)}
          onAddEmployee={handleAddEmployee}
        />
      )}
    </Grid>
  );
};

export default Employee;
