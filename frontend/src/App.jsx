import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee"
import Task from "./pages/Task"
import DocReview from "./pages/DocReview"
import Settings from "./pages/Settings"
import DashboardLayout from "./layouts/DashboardLayout";



const App = ()=>
{
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="employee" element={<Employee/>}/>
          <Route path="task" element={<Task />} />
          <Route path="doc" element={<DocReview/>} />
          <Route path="settings" element={<Settings/>}/>
        </Route>
      </Routes>
    
  );
};

export default App;