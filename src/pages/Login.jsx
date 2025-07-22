import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Error from "../components/Error"


export const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(null)
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const { email, password } = form;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form)
        } catch (e) {
            setError(e.message)
        }
    }
    return (
        <div className="login">
            <div className="menu-login">
                <h1 className="">Iniciar sesión</h1>
                <form onSubmit={handleSubmit} method="POST" className="">
                    <input type="email" value={email} name="email" placeholder="Email" onChange={handleChange} />
                    <input type="password" value={password} name="password" placeholder="Password" onChange={handleChange} />
                    <button type="submit">Siguiente</button>
                </form>

            {error && <Error error={error}/>}
            </div>
        </div>
    )
}