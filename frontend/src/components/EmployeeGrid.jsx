import {
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Button,
} from "@mui/material";

import EnhancedTable from "./EnhancedTable";
import { useAuth } from "../context/AuthContext";

const EmployeeGrid = ({ employees, onActionClick = () => {} }) => {
  const { role } = useAuth();

  const hrCells = [
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "phone_no", label: "Phone No" },
    {id: "joiningDate" , label: "Joining Date"},
    { id: "status", label: "Status" },
    { id: "action", label: "Action", disableSorting: true },
  ];

  const adminCells = [
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "active", label: "Active" },
    { id: "action", label: "Action", disableSorting: true },
  ];

  const headCells = role === "ADMIN" ? adminCells : hrCells;

  const renderCell = (id, item) => {
    switch (id) {
      case "email":
        return item.email;

      case "fullName":
        return item.fullName;

      case "phone_no":
        return item.phone_no ?? item.phone;

      case "role":
        return item.role;

        case "joiningDate":
          return item.joiningDate;

      case "status":
        return <Chip label={item.status} size="small" />;

      case "active":
        return (
          <Chip
            label={item.active ? "Active" : "Inactive"}
            color={item.active ? "success" : "default"}
            size="small"
          />
        );

      case "action":
        return (
          <Button
            variant="contained"
            size="small"
            onClick={() => onActionClick(item)}
          >
            {role === "HR" ? "View Details" : "Action"}
          </Button>
        );

      default:
        return "";
    }
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
  });

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.24)",
        bgcolor: "common.white",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <EnhancedTableContainer>
            <EnhancedTableHead />

            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow
                  key={item.id ?? item.employee_id}
                  hover
                  sx={{ "& th": { py: 2.5 } }}
                >
                  {headCells.map((column) => (
                    <TableCell key={column.id}>
                      {renderCell(column.id, item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </EnhancedTableContainer>
        </Grid>

        <Grid item xs={12}>
          <EnhancedTablePagination />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmployeeGrid;
