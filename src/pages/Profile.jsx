import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export const Profile = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null)
    const {logout} = useContext(AuthContext);

    useEffect(() => {
        fetchUser();
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
    const name = user?.name;
    const email = user?.email;
    return (
        <div>
            <div>
                <p>Welcome: <b>{name}</b></p>
                <p>Email: <b>{email}</b></p>

                <button onClick={logout} className="m-3">Logout</button>
            </div>
            {error && <p className="text-red-400">{error}</p>}

        </div>
    )
}