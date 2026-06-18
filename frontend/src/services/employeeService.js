import api from '../api/api'

export const getEmployeeDashboardStats = async ()=>
{
    const response = await api.get("/employee/dashboard/stats")
    return response.data;
}

export const savePersonalDetails = async(formData)=>
{
    const response = await api.post("/employee/personal-details",formData);

    return response.data;

}

export const saveEducationDetails = async(formData)=>
{
    const response = await api.post("/employee/education-details",formData);
    return response.data;
}

export const saveExperienceDetails = async(formData)=>
{
  const response = await api.post("/employee/experience",formData);
  return response.data;
}

export const saveBankDetails = async(formData)=>
{
    const response = await api.post("/employee/bank-details",formData);
    return response.data;
}

export const uploadDocument = async (formData) => {
  const response = await api.post(
    "/employee/documents",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const policyAccept = async(formData) =>{
  const response = await api.post("/employee/policy-acceptance",formData);
  return response.data;
}