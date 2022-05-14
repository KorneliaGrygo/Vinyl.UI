import axios from "axios";

const baseURL = "http://localhost:8000/"

export default function useAxios() {
    const axiosInstance = axios.create({
        baseURL
    });

    const handleGetUser = async (email, password) =>{
        debugger;
        const response = await axiosInstance.get(`users?email=${email}&password=${password}`);
        return response.data[0];
    }

  return {axiosInstance, handleGetUser};
}
