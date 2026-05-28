const EmployeeModal = ({ employee, onClose }) => {

  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[90%] max-w-md p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Employee Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">

          <div>
            <p className="text-sm text-slate-500">
              Employee ID
            </p>

            <h3 className="text-lg font-semibold">
              #{employee.id}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>

            <h3 className="text-lg font-semibold">
              {employee.name}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Joining Date
            </p>

            <h3 className="text-lg font-semibold">
              {employee.joiningDate}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {employee.status}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployeeModal;