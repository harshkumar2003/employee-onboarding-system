import api from "../api/api";

export const getEmployees = async () => {
    const response = await api.get("/hr/employees");
    return response.data;
};

export const getEmployeesById = async (id) => {
    const response = await api.get(`/hr/employees/${id}`);
    return response.data;
};

export const inviteEmployee = async ({fullName,email,phoneNumber,joiningDate,}) => {
    const response = await api.post("/hr/employees", {
        fullName,
        email,
        phoneNumber,
        joiningDate,
    });

    return response.data;
};

export const getHrDashboardStats = async ()=>{
    const response = await api.get("/hr/dashboard/stats");
    return response.data;
}

export const getPendingDocumets = async()=>{
    const response = await api.get("/hr/documents/pending");
    return response.data;
}

export const approveDocuments = async(id,status)=>{
    const response = await api.put(`/hr/documents/${id}/approve`,status);
    return response.data;
}
