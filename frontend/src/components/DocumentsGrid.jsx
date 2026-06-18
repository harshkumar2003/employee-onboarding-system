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

const DocumentsGrid = ({ documents, onActionClick = () => {} }) => {
  const headCells = [
    { id: "employeeName", label: "Employee Name" },
    { id: "documentType", label: "Document Type" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action", disableSorting: true },
  ];

  const renderCell = (id, item) => {
    switch (id) {
      case "employeeName":
        return item.employeeName;

      case "documentType":
        return item.documentType;

      case "status":
        return (
          <Chip
            label={item.status}
            color={
              item.status === "APPROVED"
                ? "success"
                : item.status === "REJECTED"
                ? "error"
                : "warning"
            }
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
            View
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
    records: documents,
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
                  key={item.documentId}
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

export default DocumentsGrid;