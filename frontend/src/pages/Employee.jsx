import { useState } from "react";
// import EmployeeModal from "../components/EmployeeModal";
import Table from "../components/Table";
import employeeData from "../data/employeeData.json";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import EmployeeForm from "../components/EmployeeFrom";

const Employee = () => {

  const columns = [
  {
    header: "Employee Name",
    accessor: "fullName",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Phone",
    accessor: "phone",
  },
  {
    header: "Joining Date",
    accessor: "dateOfJoining",
  },
  {
    header: "Status",
    accessor: "status",
  },
];

  const [employees, setEmployees] = useState(employeeData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    const emp = localStorage.setItem(
      "employees",
      JSON.stringify(updatedEmployees),
    );

    console.log(emp);
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="flex justify-between   px-8">
        <div className="">
          <h1 className="font-semibold">Employees</h1>
          <p className="text-slate-600 text-sm">{employeeData.length} active onboardees</p>
        </div>
        <div>
          <Button name="Add Employee" onClick={() => setIsFormOpen(true)} />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 mt-4 px-6">
        <SearchBar />
      </div>
      {isFormOpen && (
        <EmployeeForm
          onClose={() => setIsFormOpen(false)}
          onAddEmployee={handleAddEmployee}
        />
      )}

      <Table columns={columns} data={employees} />
    </div>
  );
};

export default Employee;
