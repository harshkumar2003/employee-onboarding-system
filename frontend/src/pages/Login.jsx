import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
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
      login(data, rememberMe);
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
    <div className="min-h-screen md:flex bg-slate-50">
      {/* Left Side */}
      <div className="relative overflow-hidden md:w-1/2 flex flex-col px-6 md:px-16 py-2 md:py-4   bg-transparent md:bg-gradient-to-br md:from-slate-900 md:via-blue-900 md:to-cyan-800">
        <div className="pointer-events-none absolute -top-16 -left-10 hidden h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl md:block" />
        <div className="pointer-events-none absolute bottom-10 right-8 hidden h-72 w-72 rounded-full bg-blue-200/15 blur-3xl md:block" />

        {/* Logo visible everywhere */}
        <div className="relative z-10 w-60 md:w-40 flex justify-center justify-self-center items-center">
          <img src="/logo.png" alt="logo" className="h-auto w-full object-contain" />
        </div>

        {/* Text only on desktop */}
        <div className="relative z-10 hidden md:block mt-20">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm text-blue-100 backdrop-blur-sm">
            Employee Onboarding Platform
          </p>

          <h1 className="mt-6 text-5xl font-semibold text-white leading-tight">
            Simplify Onboarding.
          </h1>

          <h1 className="text-5xl font-semibold leading-tight">
            <span className="text-cyan-300">Empower</span>{" "}
            <span className="text-white">People.</span>
          </h1>

          <p className="mt-6 max-w-md text-blue-100/90 text-lg leading-relaxed">
            Build a smooth first-day experience with clear steps, faster
            approvals, and better visibility for every new hire.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white">3x</p>
              <p className="text-sm text-blue-100/90">Faster onboarding workflows</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white">99%</p>
              <p className="text-sm text-blue-100/90">Task completion visibility</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-5  md:px-8 lg:px-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
