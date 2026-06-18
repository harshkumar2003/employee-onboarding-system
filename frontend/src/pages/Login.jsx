import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, markAuthenticated} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(email, password);

      markAuthenticated();

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Invalid credentials"
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
        px: 2,
        background:
          "liglinear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 5,
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="logo"
            sx={{
              width: 300,
              height: 60,
              mb: 2,
              objectFit: "contain",
            }}
          />

          <Typography
            variant="h5"
            fontWeight={700}
            color="#0f172a"
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#64748b",
            }}
          >
            Sign in to continue to your account
          </Typography>
        </Box>

        <LoginForm
          email={email}
          password={password}
          rememberMe={rememberMe}
          setEmail={setEmail}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
          handleLogin={handleLogin}
          loading={loading}
          error={error}
        />
      </Paper>
    </Box>
  );
};

export default Login;