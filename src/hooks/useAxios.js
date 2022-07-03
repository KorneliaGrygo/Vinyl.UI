import axios from "axios";

const baseURL = "http://localhost:8000/"

const axiosInstance = axios.create({
    baseURL
});

export const handleRegisterUser = async (user) => {
    const response = await axiosInstance.post("users",{
        email : user.email,
        nick: user.nick,
        gender: user.gender,
        phone : user.phone,
        password: user.password,
        description:"",
    })
    return response.status; //201 to jest gitówka mordo, stworzylo sie
}
export const handleGetEmail = async (email) =>{
    debugger;
    const response = await axiosInstance.get(`users?email=${email}`);
    return response.data.length;
}
export const handleGetNick = async (nick) =>{
    debugger;
    const response = await axiosInstance.get(`users?nick=${nick}`);
    return response.data.length;
}

export default function useAxios() {
    const axiosInstance = axios.create({
        baseURL
    });

    const handleGetUser = async (email, password) =>{
        const response = await axiosInstance.get(`users?email=${email}&password=${password}`);
        return response.data[0];
    }
    //const user = { email, password, }
    //handleRegisterUser(user)

  return {axiosInstance, handleGetUser};
}
