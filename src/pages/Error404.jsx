import { Link } from "react-router";
export const Error404 = () => {
    return (
        <div className="not-found">
            <h1 className="titulo">404</h1>
            <p className="subtitulo">Oops! Página no encontrada</p>
            <Link to="/" className="home-btn">Volver al inicio</Link>
        </div>
    )
}