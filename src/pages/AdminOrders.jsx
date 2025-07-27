import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router";

export const AdminOrders = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const [selected, setSelected] = useState("Pendiente")
    useEffect(() => {
        fetchOrders();
        const interval = setInterval(() => {
            fetchOrders();
        }, 10000);

        return () => clearInterval(interval);
    }, [selected])

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_API}/orders?status=${selected}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseData = await response.json();

            if (!response.ok || responseData.status === "error") {
                throw new Error(responseData.msg);
            }
            setOrders(responseData.data);
            setError(null)
        } catch (error) {
            setError(error.message)
            setOrders("")
        } finally {
            setIsLoading(false);
        }
    };
    const handleStatusFilter = (status) => {
        setSelected(status);
    };
    return (
        <div className="admin-orders-page">
            <h1 className="text-2xl mb-4">Gestión de Pedidos</h1>
            <div className="status-buttons">
                <button className={selected === "Pendiente" ? "selected" : null} onClick={() => handleStatusFilter("Pendiente")}>Pendientes y aceptados</button>
                <button className={selected === "En camino" ? "selected" : null} onClick={() => handleStatusFilter("En camino")}>En camino</button>
                <button className={selected === "Entregado" ? "selected" : null} onClick={() => handleStatusFilter("Entregado")}>Entregado</button>
                <button className={selected === "Cancelado" ? "selected" : null} onClick={() => handleStatusFilter("Cancelado")}>Cancelado</button>
            </div>
            {isLoading && (<div>Loading data...</div>)}
            {error && <ErrorMessage error={error} />}

            <div className="orders-list order-wrap">
                {orders.length === 0 ? (
                    <p>No hay pedidos todavía.</p>
                ) : (
                    orders.map((order) => (
                        <Link to={`${order._id}`} key={order._id}>
                            <div key={order._id} className="order-card order-card-admin">
                                <p><strong>Cliente:</strong> {order.user?.name || "Desconocido"}</p>
                                <p><strong>Dirección:</strong> {order.deliveryAddress}</p>
                                <p><strong>Total:</strong> {order.totalPrice.toFixed(2)}€</p>
                                <p className={`order-status1 ${order.status}`}><strong>Estado:</strong> {order.status || "Sin estado"}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}