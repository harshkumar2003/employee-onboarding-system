import { Paper, Typography } from "@mui/material";

const Task = () => {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid", borderColor: "grey.200" }}>
      <Typography variant="h5" fontWeight={700}>
        Task Page
      </Typography>
    </Paper>
  );
};

export default Task;
