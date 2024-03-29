import axios from "axios";
const baseURL = "http://localhost:8000/"
const axiosInstance = axios.create({
    baseURL
});

export const handleRegisterUser = async (user) => {

    try {
        const response = await axiosInstance.post("users",
            {
                email: user.email,
                nick: user.nick,
                gender: user.gender,
                phone: user.phone,
                password: user.password,
                description: "",
            })
        return response.status;
    } catch (error) {
        debugger;
        console.log(error);
        return 500;
    }

}

export const handleGetEmail = async (email) => {
    const response = await axiosInstance.get(`users?email=${email}`);
    return response.data.length;
}

export const handleGetNick = async (nick) => {
    const response = await axiosInstance.get(`users?nick=${nick}`);
    return response.data.length;
}

export const handleSearchResults = async (type, phrase) => {
    let response;
    switch (type) {
        case "albums":
            response = await axiosInstance.get(`${type}?name_like=${phrase}&_sort=band&_order=asc`)
            return response.data;
        case "users":
            response = await axiosInstance.get(`${type}?nick_like=${phrase}`)
            return response.data
        case 'band':
            response = await axiosInstance.get(`albums?band_like=${phrase}&_sort=band&_order=asc`)
            return response.data
        default:
            return null;
    }
}

export const handleGetUser = async (email, password) => {
    const response = await axiosInstance.get(`users?email=${email}&password=${password}`);
    return response.data[0];
}

export const handleGetAlbumById = async (albumId) => {
    const response = await axiosInstance.get(`albums/${albumId}`)
    return response.data;
}
export const handleCheckIfUserAddedAlbumToFavorites = async (userId, albumId) => {
    const response = await axiosInstance.get(`usersAlbums?albumId=${albumId}&userId=${userId}`);
    return response.data;
}
export const handleCheckIfUserAddedAlbumToShopping = async (userId, albumId) => {
    const response = await axiosInstance.get(`shoppingAlbums?albumId=${albumId}&userId=${userId}`);
    return response.data;
}
export const handleGetAlbumsCommentsSection = async (albumid) => {
    const response = await axiosInstance.get(`albumComments?albumId=${albumid}&_sort=date&_order=desc`);
    return response.data;
}
export const handleAddNewComentToAlbum = async (userId, albumId, nickName, comment, avatar) => {

    let date = new Date().toUTCString();
    const response = await axiosInstance.post('albumComments', {
        albumId,
        userId,
        nickName,
        comment,
        avatar,
        date
    })

    return response.status;
}
export const handleAddToFavorites = async (albumId, userId) => {

    const response = await axiosInstance.post("usersAlbums", {
        albumId,
        userId
    })
    return response.status;
}
export const handleAddToShopping = async (albumId, userId) => {

    const response = await axiosInstance.post("shoppingAlbums", {
        albumId,
        userId,
        amount: 1
    })
    return response.status;
}

export const handleDeleteFromFavorites = async (userAlbumId) => {

    const response = await axiosInstance.delete(`usersAlbums/${userAlbumId}`);
    return response.status;
}
export const handleDeleteFromShopping = async (shoppingAlbumsId) => {

    const response = await axiosInstance.delete(`shoppingAlbums/${shoppingAlbumsId}`);
    return response.status;
}
export const handleGetBandsAlbums = async (bandName, mainId) => {
    const response = await axiosInstance.get(`albums?band=${bandName}`);
    return response.data;
}

export const handleDeleteInvalidComment = async (comment) => {
    const response = await axiosInstance.patch(`albumComments/${comment.id}`, {
        comment: "Komentarz został usunięty przez administratora, ponieważ zawierał niewłaściwe treści"
    })
    return response.status;
}

export const handleGetUserById = async (userId) => {
    const response = await axiosInstance.get(`users/${userId}`);

    return response.data;
}
const getidsOnly = (albumsIdsoObjects) => {
    let tempString = "";
    for (let index = 0; index < albumsIdsoObjects.length; index++) {
        let id = albumsIdsoObjects[index];
        tempString += `id=${id}&`;
    }
    return tempString;
}
export const handleGetFavoriteAlbums = async (userId) => {
    const responseAlbums = await axiosInstance.get(`usersAlbums?userId=${userId}`)
    if (!responseAlbums.data.length) {
        return null;
    }
    const albumsIds = responseAlbums.data?.map(x => x.albumId);
    const responseMatchedAlbums = await axiosInstance.get(`albums?${getidsOnly(albumsIds)}`);
    return responseMatchedAlbums.data;
}
export const handleGetShoppingAlbums = async (userId) => {
    const responseAlbums = await axiosInstance.get(`shoppingAlbums?userId=${userId}`)
    if (!responseAlbums.data) {
        return null;
    }
    const albumsIds = responseAlbums.data?.map(x => x.albumId);
    const responseMatchedAlbums = await axiosInstance.get(`albums?${getidsOnly(albumsIds)}`);
    return responseMatchedAlbums.data;
}

export const handleUserProfileUpdate = async (user, userId) => {
    const response = await axiosInstance.patch(`users/${userId}`, {
        gender: user.gender,
        nationality: user.nationality,
        phone: user.phone,
        description: user.description,
        avatar: user.avatar
    })

    return response.status;
}

export const handleGetOrders = async (userId) => {
    const response = await axiosInstance.get(`shoppingAlbums?userId=${userId}`)
    return response.data;
}
export const handleUpdateWishListAlbumAmount = async (id, amount) => {
    const response = await axiosInstance.patch(`shoppingAlbums/${id}`, {
        amount: Number(amount)
    })
    return response.data;
}

export const handleAddNewOrder = async (data) => {
    const response = await axiosInstance.post("orders", data);
    return {
        statusCode: response.status,
        data: response.data
    };
}
export const handleDeleteWhistListItemByUserId = async (whishList) => {

    const promises = whishList.map(w => {
        return axiosInstance.delete(`shoppingAlbums/${w.id}`)
    })

    return await Promise.all(promises);
}
export const handleGetOrderList = async (userId, sortDir, sortBy) => {
    const response = await axiosInstance.get(`orders?userId=${userId}&_sort=${sortBy}&_order=${sortDir}`);
    return response.data;
}

export const handleGetOrderDetailsByOrderIdAndUserId = async (orderId, userId) => {
    const response = await axiosInstance.get(`orders?userId=${userId}&id=${orderId}`)
    return response.data[0];
}


