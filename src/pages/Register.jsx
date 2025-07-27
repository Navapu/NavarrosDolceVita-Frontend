import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export const Register = () => {
    const [error, setError] = useState(null)
    const { register } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
        name: ""
    })
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { email, password, name } = form;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form)
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="login">
            <div className="menu-login">
                <h1 className="title-login">Registrate</h1>
                <form onSubmit={handleSubmit} method="POST" className="">
                    <input type="text" value={name} name="name" placeholder="Name" onChange={handleChange}/>

                    <input type="email" value={email} name="email" placeholder="Email" onChange={handleChange} />
                    <input type="password" value={password} name="password" placeholder="Password" onChange={handleChange} />
                    <button type="submit">Siguiente</button>
                </form>

                {error && <ErrorMessage error={error} />}
            </div>
        </div>
    )
}