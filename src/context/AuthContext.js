import { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";


let user = {
    nickName:"",
    email:"",
    description:""
}

export const AuthContext = createContext();

export const authReducer = (state, action) =>{

    switch (action.type) {
        case "LOGIN":

            
            break;
    
        default:
            break;
    }
}
export function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, {
        user: user === null ? JSON.parse(localStorage.getItem("user")) ?? null : null 
    })
  return (

    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
  )
}
