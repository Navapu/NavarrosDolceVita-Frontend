import { useState, useEffect } from "react";
import Orders from "../components/Orders";
import ErrorMessage from "../components/ErrorMessage"
export const Profile = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchUser();
        fetchUserOrders();
    }, [])

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BACKEND_API}/user/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const responseData = await response.json();

            if (!response.ok || responseData.status === "error") {
                throw new Error(responseData.msg);
            }
            setUser(responseData.data);
            setError(null)
        } catch (e) {
            setError(e.message)
        }
    }

    const fetchUserOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BACKEND_API}/orders/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const ordersdata = await response.json();
            if (!response.ok || ordersdata.status === "error") {
                throw new Error(ordersdata.msg);
            }

            setOrders(ordersdata.data);
        } catch (error) {
            setError(error.message);
        }
    }
    const name = user?.name;
    console.log(user)
    return (
        <div>
            <div className="mt-4 flex w-full items-center justify-center ">
                <h1 className="text-center">Bienvenido {name}</h1>
            </div>
            <div>
                <ul className="orders-list">
                    {orders.map(order => (
                        <li key={order._id} className="w-full">
                            <Orders {...order} />
                        </li>
                    ))}
                </ul>
            </div>
            {error && <ErrorMessage error={error}/>}

        </div>
    )
}