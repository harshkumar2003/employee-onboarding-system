import { Paper, Typography } from "@mui/material";

const Settings = () => {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid", borderColor: "grey.200" }}>
      <Typography variant="h5" fontWeight={700}>
        Settings
      </Typography>
    </Paper>
  );
};

export default Settings;
