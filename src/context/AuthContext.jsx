import { createContext, useState } from "react";
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

const getUser = () => {
    const localStorageUser = localStorage.getItem('user');
    return localStorageUser ? JSON.parse(localStorageUser) : null;
}

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);
    const isLoggedIn = user !== null;
    const navigate = useNavigate();

    const login = async (data) => {
        const response = await fetch(`${BACKEND_API}/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if (!response.ok || responseData.status === "error") {
            throw new Error(responseData.msg)
        }
        console.log(responseData)

        localStorage.setItem('token', responseData.data.token);
        delete responseData.data.token;
        localStorage.setItem('user', JSON.stringify(responseData.data));
        setUser(response.data)
        navigate("/perfil");
    }

    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null)
        navigate("/login");
    }

    const getOrder = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACKEND_API}/orders/me/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok || data.status === "error") {
            throw new Error(data.msg);
        }
        console.log(data.data)
        return data.data;
    }
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, getOrder }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider