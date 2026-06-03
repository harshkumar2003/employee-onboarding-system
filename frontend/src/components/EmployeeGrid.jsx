import {
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import EnhancedTable from "./EnhancedTable";
import Button from "./Button";

const EmployeeGrid = ({ employees }) => {
  const headCells = [
  { id: "fullName", label: "Full Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "dateOfJoining", label: "Date Of Joining"},
  { id: "status", label: "Status"},
  { id: "action", label: "Action",  disableSorting: true },
];;

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
                <TableRow key={item.id} hover sx={{"& th": {py: 2.5,},}}>
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
        </Grid>

        <Grid item xs={12}>
          <EnhancedTablePagination />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmployeeGrid;