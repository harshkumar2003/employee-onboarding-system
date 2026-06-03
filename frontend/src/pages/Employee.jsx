import { useState } from "react";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EnhancedTable from "../components/EnhancedTable";
import employeeData from "../data/employeeData.json";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import EmployeeForm from "../components/EmployeeFrom";

const Employee = () => {
  const headCells = [
    { id: "id", label: "ID" },
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "dateOfJoining", label: "Date Of Joining" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action", disableSorting: true },
  ];

  const [employees, setEmployees] = useState(employeeData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const filterFn = {
    fn: (items) => items,
  };

  const {
    EnhancedTableContainer,
    EnhancedTableHead,
    EnhancedTablePagination,
    recordsAfterPagingAndSorting,
  } = EnhancedTable({
    records: employees,
    headCells,
    filterFn,
    maxHeight: 520,
  });

  return (
    <Stack spacing={2.5}>
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

      {isFormOpen && (
        <EmployeeForm
          onClose={() => setIsFormOpen(false)}
          onAddEmployee={handleAddEmployee}
        />
      )}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "rgba(148, 163, 184, 0.24)",
          bgcolor: "common.white",
          boxShadow: "0 18px 46px rgba(15, 23, 42, 0.06)",
        }}
      >
        <Box sx={{ px: 2.25, py: 1.75, borderBottom: "1px solid", borderColor: "rgba(148, 163, 184, 0.2)" }}>
          <Typography variant="subtitle2" fontWeight={700} color="text.secondary" letterSpacing={0.8}>
            EMPLOYEE DIRECTORY
          </Typography>
        </Box>

        <EnhancedTableContainer>
          <EnhancedTableHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.dateOfJoining}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button name="Edit" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </EnhancedTableContainer>

        <EnhancedTablePagination />
      </Paper>
    </Stack>
  );
};

export default Employee;
