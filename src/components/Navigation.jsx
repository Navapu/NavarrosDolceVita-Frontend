import { NavLink } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navigation = () => {
    const { isLoggedIn, user } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navigation">
            <button className="hamburger" aria-label="Toggle menu" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li>
                    <NavLink to="/" onClick={() => setIsOpen(false)}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/carta" onClick={() => setIsOpen(false)}> Carta </NavLink>
                </li>
                <li>
                    <NavLink to="/perfil" onClick={() => setIsOpen(false)}> Perfil </NavLink>
                </li>
                {isLoggedIn && user?.role === "admin" && (
                    <li>
                        <NavLink to="/pedidos/admin" onClick={() => setIsOpen(false)}> Pedidos </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};
