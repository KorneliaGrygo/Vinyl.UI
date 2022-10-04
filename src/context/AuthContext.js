import { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";


let user = {
    id: null,
    email: null,
    nick: null,
    gender: null,
    phone: null,
    description: null,
    role:null,
    avatar:null
}

export const AuthContext = createContext();

export const authReducer = (state, action) =>{
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {...state, user:action.payload}
        case "LOGOUT":{
            localStorage.clear();
            return {...state, user: null}
        }
        default:
            break;
    }
}
export function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, {
        user : user.id === null ? JSON.parse(localStorage.getItem("user")) : user,
        userId : user?.id 
    })
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
  )
}
