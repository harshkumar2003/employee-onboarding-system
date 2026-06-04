import axios from "axios";

export const loginUser = async ( ) =>{
  const response = await axios.post("https://dummyjson.com/auth/login",
    {
      username: "emilys",
      password: "emilyspass",
    }
    
    
  )
  return response.data;
}