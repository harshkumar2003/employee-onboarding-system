import { useEffect, useState, useMemo } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import EmployeeForm from "../components/EmployeeFrom";
import EmployeeGrid from "../components/EmployeeGrid";
import EmployeeModal from "../components/EmployeeModal";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../services/adminService";
import { getEmployees } from "../services/hrService";

const Employee = () => {
  const { role } = useAuth();

  const isAdmin = role === "ADMIN";
  const isHR = role === 'HR';

  const [employees, setEmployees] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      let data;

      if (role === "ADMIN") {
        data = await getUsers();
      } else if (role === "HR") {
        data = await getEmployees();
      }

      setEmployees(data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
  }, [role]);

  // const handleAddEmployee = (newEmployee) => {
  //   if(!isAdmin) return;
  //   const updatedEmployees = [...employees, newEmployee];
  //   setEmployees(updatedEmployees);
  //   localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  // };

  const handleAddEmployee = (newEmployee) => {
    if (!isAdmin) return;
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const visibleEmployees = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return employees.filter(
      (employee) =>
        employee.fullName?.toLowerCase().includes(term) ||
        employee.email?.toLowerCase().includes(term) ||
        employee.phone?.toLowerCase().includes(term) ||
        employee.phone_no?.toLowerCase().includes(term)
    );
  }, [employees, searchTerm]);

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseEmployeeModal = () => {
    setSelectedEmployee(null);
  };

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
          <EmployeeGrid
            employees={visibleEmployees}
            onActionClick={isHR ? handleViewEmployee : undefined}
          />
        </Paper>
      </Grid>

      <EmployeeModal
        employee={selectedEmployee}
        onClose={handleCloseEmployeeModal}
      />

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
