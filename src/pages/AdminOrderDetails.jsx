import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ErrorMessage from "../components/ErrorMessage";

export const AdminOrderDetails = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const { id } = useParams();
    const { getOrder } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState([]);
    const [selected, setSelected] = useState()
    const [successMsg, setSuccessMsg] = useState(null);


    useEffect(() => {
        fetchOrder();
    }, [])
    const fetchOrder = async () => {
        try {
            const data = await getOrder(id);
            setOrder(data);
            setSelected(data.status)
        } catch (error) {
            setError(error)
        }
    }
    const handleStatusFilter = (status) => {
        setSelected(status);
    };
    const handleStatusUpdate = async () => {
        try {
            setSuccessMsg(null);
            setError(null);

            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_API}/orders/status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: selected })
            });

            const responseData = await response.json();

            if (!response.ok || responseData.error) {
                throw new Error(responseData.msg || "Failed to update order status");
            }

            setSuccessMsg("Estado del pedido actualizado correctamente");
            fetchOrder();

        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className='order-detail-father'>
            <div className="order-detail">
                <h2>Fecha: {new Date(order.createdAt).toLocaleDateString()}</h2>
                <p><span className="label">Estado:</span> {order.status}</p>

                <div>
                    <h3 className="section-title">Dirección de entrega</h3>
                    <p>{order.deliveryAddress}</p>
                </div>

                <div>
                    <h3 className="section-title">Total</h3>
                    <p>{order.totalPrice} €</p>
                </div>

                <div>
                    <h3 className="section-title products-title">Productos</h3>
                    <div className="products-list">
                        {order.products?.map((item, i) => (
                            <div key={i} className="product-item">
                                <img src={item.imageUrl} alt={item.name} className="product-image" />
                                <div>
                                    <p className="product-name">{item.name}</p>
                                    <p className="product-quantity-price">
                                        {item.quantity} x {item.price}€
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="status-buttons">
                    <button className={selected === "Preparando" ? "selected1" : null} onClick={() => handleStatusFilter("Preparando")}>Preparando</button>
                    <button className={selected === "En camino" ? "selected1" : null} onClick={() => handleStatusFilter("En camino")}>En camino</button>
                    <button className={selected === "Entregado" ? "selected1" : null} onClick={() => handleStatusFilter("Entregado")}>Entregado</button>
                    <button className={selected === "Cancelado" ? "selected1" : null} onClick={() => handleStatusFilter("Cancelado")}>Cancelado</button>
                </div>
                <button className="btn-update-status" onClick={handleStatusUpdate} disabled={selected === order.status}>Guardar estado</button>

                {successMsg && <p className="success-msg">{successMsg}</p>}
                {error && <ErrorMessage error={error} />}
            </div>
        </div>
    )
}