import { Navigation } from "./Navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router";
export const Header = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { orderProducts } = useContext(OrderContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">
            <div className="header-container">
                <img src="/logo_Navarro'sDolceVita.png" alt="Navarro's Dolce Vita Logo" className="logo" onClick={() => navigate("/")}/>
                <Navigation />
                <div className="header-actions">
                    <button onClick={() => navigate("/carrito")} className="logout-button">
                        🛒 {orderProducts.length}
                    </button>
                    {isLoggedIn ? (<button onClick={handleLogout} className="logout-button"> Logout </button> ):
                    (<button onClick={() => navigate("/login")} className="logout-button">Iniciar sesión </button>)}
                </div>
            </div>
        </header>
    );
};
