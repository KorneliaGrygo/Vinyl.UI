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
    const response = await axiosInstance.get(`users?email=${email}`);
    return response.data.length;
}

export const handleGetNick = async (nick) =>{
    const response = await axiosInstance.get(`users?nick=${nick}`);
    return response.data.length;
}

export const handleSearchResults = async (type, phrase) => {
    if(type === "albums"){
        const response = await axiosInstance.get(`${type}?name_like=${phrase}`)
        return response.data;
    }else{
        const response = await axiosInstance.get(`${type}?nick_like=${phrase}`)
        return response.data;
    }
}

export const handleGetUser = async (email, password) =>{
    const response = await axiosInstance.get(`users?email=${email}&password=${password}`);
    return response.data[0];
}

export const handleGetAlbumById = async (albumId) =>{
    const response = await axiosInstance.get(`albums/${albumId}`)
    return response.data;
}
export const handleCheckIfUserAddedAlbumToFavorites = async (userId, albumId) =>{
    const response = await axiosInstance.get(`usersAlbums?albumId=${albumId}&userId=${userId}`);
    return response.data.length > 0;
}
export const handleGetAlbumsCommentsSection = async (albumid) => {
    const response  = await axiosInstance.get(`albumComments?albumId=${albumid}`);
    return response.data;
}
export const handleAddNewComentToAlbum = async (userId, albumId, nickName, comment) =>{
    const response = await axiosInstance.post('albumComments',{
        albumId,
        userId,
        nickName,
        comment
    })

    return response.status;
}

export default function useAxios() {
  return null;
}
