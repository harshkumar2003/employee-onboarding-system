import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Mail, Lock } from "lucide-react";

const LoginForm = ({
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
  handleLogin,
  loading,
  error,
}) => {
  return (
    <Box component="form" onSubmit={handleLogin} sx={{ display: "grid", gap: 2.4 }}>
      <Box>
        <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ letterSpacing: -0.5 }}>
          Sign in
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.75, lineHeight: 1.7 }} color="text.secondary">
          Access your onboarding portal
        </Typography>
      </Box>

      <Stack spacing={1}>
        <Typography variant="caption" fontWeight={700} letterSpacing={1.2} color="text.secondary">
          EMAIL
        </Typography>
        <TextField
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={18} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f8fafc",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
              "&.Mui-focused": {
                backgroundColor: "#ffffff",
              },
            },
          }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" fontWeight={700} letterSpacing={1.2} color="text.secondary">
          PASSWORD
        </Typography>
        <TextField
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={18} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f8fafc",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
              "&.Mui-focused": {
                backgroundColor: "#ffffff",
              },
            },
          }}
        />
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember me"
          sx={{ color: "text.secondary", "& .MuiFormControlLabel-label": { fontSize: 14 } }}
        />
        <Link component={RouterLink} to="/forgot" underline="hover" sx={{ fontWeight: 600 }}>
          Forgot Password?
        </Link>
      </Box>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          mt: 0.5,
          py: 1.35,
          borderRadius: 3,
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "0 12px 24px rgba(37, 99, 235, 0.22)",
          
        }}
      >
        {loading ? "Authenticating..." : "Login"}
      </Button>
    </Box>
  );
};

export default LoginForm;
