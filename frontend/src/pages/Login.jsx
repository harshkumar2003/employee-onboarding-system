import { useState } from "react";
import { Box, Paper, Typography, Chip } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        bgcolor: "#f8fafc",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          px: { xs: 2.5, md: 6 },
          py: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "flex-start" },
          background: {
            xs: "transparent",
            md: "linear-gradient(135deg, #0b1120 0%, #122b69 52%, #0f766e 100%)",
          },
          color: "common.white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -64,
            left: -40,
            display: { xs: "none", md: "block" },
            width: 208,
            height: 208,
            borderRadius: "50%",
            bgcolor: "rgba(103, 232, 249, 0.16)",
            filter: "blur(56px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            right: 32,
            display: { xs: "none", md: "block" },
            width: 288,
            height: 288,
            borderRadius: "50%",
            bgcolor: "rgba(191, 219, 254, 0.14)",
            filter: "blur(56px)",
          }}
        />

        <Chip
          label="Employee Onboarding Platform"
          sx={{
            alignSelf: "center",
            position: "relative",
            zIndex: 1,
          display: { xs: "none", md: "inline-flex" },
          mb: 2,
          px: 0.5,
            bgcolor: "rgba(255,255,255,0.1)",
            color: "#dbeafe",
            border: "1px solid rgba(255,255,255,0.16)",
            backdropFilter: "blur(10px)",
            fontWeight: 600,
          }}
        />

        <Box
          component="img"
          src="/logo.png"
          alt="logo"
          sx={{
            position: "relative",
            zIndex: 1,
            width: { xs: 170, md: 150 },
            alignSelf: "center",
            objectFit: "contain",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1, mt: { md: 7 }, display: { xs: "none", md: "block" } }}>
          <Typography variant="h3" sx={{ mt: 2, fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.9 }}>
            Simplify Onboarding.
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.9 }}>
            <Box component="span" sx={{ color: "#67e8f9" }}>
              Empower
            </Box>{" "}
            <Box component="span">People.</Box>
          </Typography>

          <Typography variant="body1" sx={{ mt: 2.5, maxWidth: 440, color: "rgba(219, 234, 254, 0.92)", lineHeight: 1.7, fontWeight: 400 }}>
            Build a smooth first-day experience with clear steps, faster approvals, and better visibility for every new hire.
          </Typography>

          <Box
          sx={{
            mt: 4,
            display: "grid",
            maxWidth: 440,
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 1.5,
          }}
        >
            <Paper
              elevation={0}
              sx={{
                p: 1.75,
                borderRadius: 3.5,
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                color: "common.white",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                3x
              </Typography>
              <Typography variant="body2" sx={{ color: "#dbeafe" }}>
                Faster onboarding workflows
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                p: 1.75,
                borderRadius: 3.5,
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                color: "common.white",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                99%
              </Typography>
              <Typography variant="body2" sx={{ color: "#dbeafe" }}>
                Task completion visibility
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>

      <Box
          sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 4, lg: 6 },
          py: 4,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 5,
            border: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.24)",
            bgcolor: "common.white",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
          }}
        >
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
            loading={loading}
            error={error}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
