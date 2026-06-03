import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Box,
} from "@mui/material";
import { useState } from "react";

const EnhancedTable = ({
  records,
  headCells,
  filterFn,
  customizedPages,
  tableHeaderTextAlignment,
  maxHeight,
}) => {
  const pages =
    customizedPages && customizedPages.length > 0
      ? customizedPages
      : [5, 10, 20, 50];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const EnhancedTableContainer = ({ children }) => (
    <TableContainer
      style={{
        width: "100%",
        overflowX: "auto",
        maxHeight: maxHeight || 520,
        overflowY: maxHeight ? "auto" : "visible",
      }}
    >
      <Table stickyHeader size="small" sx={{width: "100%",tableLayout: "fixed",}}>
        {children}
      </Table>
    </TableContainer>
  );

  const EnhancedTableHead = () => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";

      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    if (records.length > 0) {
      return (
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                style={{
                  textAlign: tableHeaderTextAlignment || "",
                  fontWeight: 600,
                }}
                sortDirection={
                  orderBy === headCell.id ? order : false
                }
                sx={{
                  bgcolor: "#f8fafc",
                  color: "#334155",
                  borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {headCell.disableSorting ? (
                  headCell.label
                ) : (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={
                      orderBy === headCell.id
                        ? order
                        : "asc"
                    }
                    onClick={() =>
                      handleSortRequest(headCell.id)
                    }
                  >
                    {headCell.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }

    return null;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(
      parseInt(event.target.value, 10)
    );
    setPage(0);
  };

  const EnhancedTablePagination = () =>
    records.length > 0 ? (
      <Box sx={{ borderTop: "1px solid rgba(148, 163, 184, 0.2)", display:"flex",justifyContent:"center" }}>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={records.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            bgcolor: "#fff",
            "& .MuiTablePagination-toolbar": { px: 2 },
          }}
        />
      </Box>
    ) : null;

  function descendingComparator(a, b, orderBy) {
    const aValue = a[orderBy] ?? "N/A";
    const bValue = b[orderBy] ?? "N/A";

    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;

    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) =>
          descendingComparator(a, b, orderBy)
      : (a, b) =>
          -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map(
      (el, index) => [el, index]
    );

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);

      if (order !== 0) return order;

      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  const recordsAfterPagingAndSorting = () => {
    let data = filterFn.fn(records);

    data = stableSort(
      data,
      getComparator(order, orderBy)
    );

    return data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  return {
    EnhancedTableContainer,
    EnhancedTableHead,
    EnhancedTablePagination,
    recordsAfterPagingAndSorting,
  };
};

export default EnhancedTable;
