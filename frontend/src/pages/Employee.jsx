import { useState } from "react";
import employeeData from "../data/employeeData.json";
import Table from "../components/Table";
import EmployeeModal from "../components/EmployeeModal";

const Employee = () => {

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Employee Name",
      accessor: "name",
    },
    {
      header: "Joining Date",
      accessor: "joiningDate",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <div className="p-6">

      <Table
        columns={columns}
        data={employeeData}
        onRowClick={setSelectedEmployee}
      />

      {/* Modal */}
      <EmployeeModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />

    </div>
  );
};

export default Employee;