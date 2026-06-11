import api from '../api/api'

export const getEmployees = async () =>{
    const response = await api.get("/hr/employees");
    return response.data;
}

export const getEmployeesById = async (id) =>{
    const response = await api.get(`/hr/employees/${id}`)
    return response.data;
}
