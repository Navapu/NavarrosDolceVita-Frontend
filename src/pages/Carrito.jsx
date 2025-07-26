import { useContext, useState, useRef, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router";
import CarritoItem from "../components/CarritoItems";
import { AuthContext } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage"

export const Carrito = () => {
    const MAPS_API = import.meta.env.VITE_MAPS_API;
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const { orderProducts, removeFromOrder, clearOrder } = useContext(OrderContext);
    const { isLoggedIn, user } = useContext(AuthContext)
    const navigate = useNavigate();
    const total = orderProducts.reduce((acc, item) => acc + item.price, 0);

    const existsAddress = user?.deliveryAddress ? true : false;
    const [address, setAddress] = useState(existsAddress ? user.deliveryAddress : "")
    const [extraInformation, setExtraInformation] = useState("");
    const inputRef = useRef(null);
    const [error, setError] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState("tarjeta");


    useEffect(() => {
        if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
            initAutocomplete();
            return;
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
    }, []);
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const validateAddress = (place) => {
        if (!place.address_components) return false;

        const comps = place.address_components;

        const localityNames = comps
            .filter(c => c.types.includes("locality") || c.types.includes("postal_town"))
            .map(c => normalizeText(c.long_name));

        const valenciaNormalized = "valencia";

        const isValenciaCapital = localityNames.some(name => name === valenciaNormalized);

        return isValenciaCapital;
    };
    const initAutocomplete = () => {
        if (!window.google?.maps?.places) return;
        const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["address"],
            componentRestrictions: { country: "es" },
            fields: ["formatted_address", "address_components"]
        });
        ac.addListener("place_changed", () => {
            const place = ac.getPlace();
            if (validateAddress(place)) {
                setAddress(place.formatted_address);
            } else {
                setAddress(place.formatted_address);
                setError("Solo aceptamos pedidos a domicilio en Valencia capital, revise la dirección introducida")
            }
        });
    };
    const handlePayment = (method) => {
        setSelectedPayment(method);
    }

    const submitOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_API}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    products: orderProducts.map((item) => ({
                        id: item._id,
                        quantity: 1,
                        imageUrl: item.imageUrl
                    })),
                    deliveryAddress: `${address} ${extraInformation}`,
                    selectedPayment: selectedPayment,
                }),
            });
            const data = await response.json();

            if (!response.ok || data.status === "error") {
                throw new Error(data.msg);
            }

            console.log("Pedido enviado correctamente!");
            clearOrder();
            navigate("/perfil")
        } catch (error) {
            setError(error.message)
        }
    };


    if (orderProducts.length === 0) {
        return (
            <div className="cart-page">
                <h2>Tu carrito está vacío</h2>
                <button onClick={() => navigate("/carta")} className="show-menu">Ver carta</button>
            </div>
        );
    }
    return (
        <div className="cart-page">
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
            <h2>Tu pedido</h2>
            <ul className="cart-list">
                {orderProducts.map((item) => (
                    <CarritoItem key={item._id} item={item} onRemove={removeFromOrder} />
                ))}
            </ul>
            <h2 className="total-cart">Total: {total.toFixed(2)}€</h2>
            <div className="section-address">
                <div>
                    <p>Dirección de entrega</p>
                    {existsAddress && isLoggedIn ?
                        <input type="text" className="address" value={address} onChange={(e) => setAddress(e.target.value)} ref={inputRef} name="address"></input> :
                        <input type="text" placeholder="Dirección de entrega" className="address" value={address} onChange={(e) => setAddress(e.target.value)} ref={inputRef} name="address"></input>}
                </div>
                <div>
                    <p>Información adicional</p>
                    <input type="text" placeholder="Puerta, piso ..." className="address" name="information" value={extraInformation} onChange={(e) => setExtraInformation(e.target.value)}/>
                </div>

            </div>
            <div className="buttons-sections">
                <div className="payment">
                    <button onClick={() => handlePayment("tarjeta")} className={selectedPayment === "tarjeta" ? "selected" : ""}>Tarjeta</button>
                    <button onClick={() => handlePayment("efectivo")} className={selectedPayment === "efectivo" ? "selected" : ""}>Efectivo</button>
                </div>
                <div className="cart-actions">
                    <button onClick={clearOrder} className="clear-order">Vaciar carrito</button>
                    <button onClick={submitOrder} disabled={isLoggedIn && !error ? false : true} className={isLoggedIn && !error ? "active-button" : "disabled-button"}>Confirmar pedido</button>
                </div>
            </div>
            {isLoggedIn ? null : <p className="login-warning">Para confimar el pedido, primero debe iniciar sesión</p>}
            {error && <ErrorMessage error={error} />}
        </div>
    );
}