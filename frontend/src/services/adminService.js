import api from "../api/api";

export const getUsers = async () =>{
    const response = await api.get("/admin/users");
    return response.data;
}

export const getAdminDashboardStats = async ()=>{
    const response = await api.get("/admin/dashboard/stats")
    return response.data;
}

export const updateUserRole = async(id,role) =>{
    const response = await api.put(`/admin/users/${id}/role`,
        {
            role
        }
        
    )
    return response.data;
}
export const updateUserStatus = async(id,status) =>{
    const response = await api.put(`/admin/users/${id}/status`,
        {
            status
        }
    )
    return response.data;
}
