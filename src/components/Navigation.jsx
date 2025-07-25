import { NavLink } from "react-router";
export const Navigation = () => {
    return (
        <nav>
            <ul className="flex gap-5">
                <li className="prueba"><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/login">Iniciar sesión</NavLink></li>
                <li><NavLink to="/profile">Perfil</NavLink></li>
                {/* <li><NavLink to="/register">Register</NavLink></li> */}
                <li><NavLink to="/carta">Carta</NavLink></li>


            </ul>
        </nav>
    );
}