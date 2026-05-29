import { useState } from "react";

const EmployeeForm = ({ onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfJoining: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validation = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Minimum 3 characters required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Only letters are allowed";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone no is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    const today = new Date().toISOString().split("T")[0];

    if (!formData.dateOfJoining) {
      errors.dateOfJoining = "Joining date is required";
    } else if (formData.dateOfJoining < today) {
      errors.dateOfJoining = "Joining date cannot be in the past";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newEmployee = {
      id: Date.now(),
      ...formData,
      status: "Not started",
    };

    onAddEmployee(newEmployee);
    onClose();
  };

  return(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-[500px] rounded-lg p-6 shadow-lg">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">
            Add Employee
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full border rounded p-2"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full border rounded p-2"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block mb-1">
              Date of Joining
            </label>

            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full border rounded p-2"
            />

            {errors.dateOfJoining && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfJoining}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Employee
            </button>
          </div>
        </form>

      </div>
    </div>
  );    
};
export default EmployeeForm;
