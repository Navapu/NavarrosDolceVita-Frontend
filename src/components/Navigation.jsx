import { NavLink } from "react-router";
export const Navigation = () => {
    return (
        <nav>
            <ul className="flex gap-5">
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/carta">Carta</NavLink></li>
                <li><NavLink to="/perfil">Perfil</NavLink></li>
            </ul>
        </nav>
    );
}