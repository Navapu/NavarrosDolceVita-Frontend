import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage"

export const AdminOrders = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_API}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseData = await response.json();

            if (!response.ok || responseData.status === "error") {
                throw new Error(responseData.msg);
            }
            setOrders(responseData.data);
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="admin-orders-page">
            <h1 className="text-2xl font-bold mb-4">Gestión de Pedidos</h1>
            {isLoading && (<div>Loading data...</div>)}
            {error && <ErrorMessage error={error}/>}

            <div className="orders-list">
                {orders.length === 0 ? (
                    <p>No hay pedidos todavía.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <p><strong>Cliente:</strong> {order.user?.name || "Desconocido"}</p>
                            <p><strong>Dirección:</strong> {order.deliveryAddress}</p>
                            <p><strong>Método de pago:</strong> {order.selectedPayment}</p>
                            <p><strong>Total:</strong> {order.totalPrice.toFixed(2)}€</p>
                            <p><strong>Estado:</strong> {order.status || "Sin estado"}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}