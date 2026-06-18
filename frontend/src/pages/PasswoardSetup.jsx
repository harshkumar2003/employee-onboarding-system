import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";

import { setupPassword } from "../services/authService";

const SetupPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await setupPassword({
        token,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to setup password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8fafc",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 450,
          p: 4,
          borderRadius: 4,
          border: "1px solid #e2e8f0",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={1}
        >
          Setup Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          Create your account password.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              fullWidth
            />

            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              fullWidth
            />

            {error && (
              <Typography color="error">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading
                ? "Setting Password..."
                : "Setup Password"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SetupPassword;