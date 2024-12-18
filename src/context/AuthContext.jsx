import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar definido dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para registrar un usuario
    const signup = async (userData) => {
        try {
            setErrors([]); // Limpia errores anteriores
            const res = await registerRequest(userData);
            setUser(res.data); // Guarda los datos del usuario
            setIsAuthenticated(true);
        } catch (error) {
            setErrors([error.response?.data?.message || "Error al registrar"]);
        }
    };

    // Función para iniciar sesión
    const signin = async (userData) => {
        try {
            setErrors([]); // Limpia errores anteriores
            const res = await loginRequest(userData);
            setUser(res.data.user); // Asegúrate de que el backend devuelva los datos del usuario
            setIsAuthenticated(true);
        } catch (error) {
            setErrors([error.response?.data?.message || "Credenciales incorrectas"]);
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        logoutRequest();
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    // Limpia errores de forma manual
    const clearErrors = () => setErrors([]);

    // Verifica el token al cargar la página
    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get("token"); // Obtén directamente el token
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data); // Almacena los datos del usuario
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);
    
    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                user,
                isAuthenticated,
                errors,
                clearErrors,
                loading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.any,
};
