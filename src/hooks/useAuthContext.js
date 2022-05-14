import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";




export default function useAuthContext() {
    debugger;
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Context is not in range of application");
    }
    return context;
}
