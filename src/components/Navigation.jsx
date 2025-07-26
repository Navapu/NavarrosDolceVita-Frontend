import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const Navigation = () => {
    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <nav>
            <ul className="flex gap-5">
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/carta">Carta</NavLink></li>
                <li><NavLink to="/perfil">Perfil</NavLink></li>
                {isLoggedIn && user?.role === "admin" && ( <li><NavLink to="/pedidos/admin">Pedidos</NavLink></li> )}
            </ul>
        </nav>
    );
}