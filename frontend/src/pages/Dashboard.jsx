import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onLogout={logout} />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Signed in
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Welcome to the HR dashboard
          </h1>
          <p className="mt-3 text-slate-600">
            Your backend login is working and the access token is now stored in browser auth state.
          </p>
          <div className="mt-6 rounded-2xl bg-slate-900 p-4 text-sm text-slate-100">
            <div className="font-semibold text-white">Access token</div>
            <div className="mt-2 break-all font-mono text-xs text-slate-300">
              {auth?.accessToken}
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
