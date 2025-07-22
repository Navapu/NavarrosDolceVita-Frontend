import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export const OrderDetails = () => {
    const { id } = useParams();
    const { getOrder } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetchOrder();
    }, [])
    const fetchOrder = async () => {
        try {
            const data = await getOrder(id);
            setOrder(data);
        } catch (error) {
            setError(error)
        }
    }
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
            </div>

            {error && <ErrorMessage error={error} />}

        </div>
    )
}