import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRouteAdmin = ({ children }) => {
    const { isLoggedIn, user } = useContext(AuthContext);

    return isLoggedIn && user?.role === "admin" ? children: <Navigate to="/login" />;
};
