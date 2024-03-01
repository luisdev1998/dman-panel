import { useState, useEffect, createContext, useCallback } from "react";
import clientAxios from "../config/AxiosUrl";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const isAuthenticated = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token){
                setAuth(null);
                return;
            }
            const response = await clientAxios('/adminusuario/perfil');
            if(response.data.success){
                setAuth(response.data.info);
            }else{
                setAuth(null);
            }
        } catch (error) {
            setAuth(null);
        } finally {
            setAuthLoading(false);
        }
    }

    const closeSession = () => {
        localStorage.removeItem('token');
        setAuth(null);
    }

    return (
        <AuthContext.Provider
        value={{
            auth,setAuth,closeSession,authLoading,isAuthenticated
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext;