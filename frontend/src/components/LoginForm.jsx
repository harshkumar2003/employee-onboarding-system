import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  loading,
  error,
}) => {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
        <h2 className="mt-1 text-sm text-slate-600">Access your onboarding portal</h2>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-wide text-slate-600">EMAIL</label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            className="w-full rounded-xl border border-gray-300 py-2.5 pl-12 pr-4 outline-none transition focus:border-[#3660F3] focus:ring-2 focus:ring-[#3660F3]/20"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-wide text-slate-600">PASSWORD</label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            className="w-full rounded-xl border border-gray-300 py-2.5 pl-12 pr-4 outline-none transition focus:border-[#3660F3] focus:ring-2 focus:ring-[#3660F3]/20"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Link className="font-medium text-blue-600 hover:text-blue-700" to="/forgot">
          Forgot Password?
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        className="mt-2 flex w-full justify-center rounded-xl bg-slate-900 px-8 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
