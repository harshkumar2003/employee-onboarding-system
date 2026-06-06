import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Employee from "./pages/Employee";
import Task from "./pages/Task";
import DocReview from "./pages/DocReview";
import Settings from "./pages/Settings";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="employee" element={<Employee/>}/>
          <Route path="task" element={<Task />} />
          <Route path="doc" element={<DocReview/>} />
          <Route path="settings" element={<Settings/>}/>
        </Route>
      </Route>
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

export default App;
