import { useState, useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { Products } from "../components/Products";
export const Carta = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const [category, setCategory] = useState({
        Pizza: [],
        Pasta: [],
        Bebida: [],
        Postre: []
    })

    useEffect(() => {
        fetchProducts();
    }, [])
    useEffect(() => {
        categoryProducts();
    }, [products]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BACKEND_API}/products`);
            const data = await response.json();

            if (!response.ok || data.status === "error") {
                throw new Error(data.msg);
            }
            setProducts(data.data);
        } catch (error) {
            setError(error)
        }
    }

    const categoryProducts = () => {
        const grouped = {
            Pizza: [],
            Pasta: [],
            Bebida: [],
            Postre: []
        };

        products.forEach((product) => {
            if (grouped[product.category]) {
                grouped[product.category].push(product);
            }
        });

        setCategory(grouped);
    }
    return (
        <div className="menu-page">
            <h1>Carta</h1>

            <div className="category">
                <h2>Pizzas</h2>
                <div className="product-list">
                    {category.Pizza.map((product) => (
                        <li key={product._id}>
                            <Products {...product} />
                        </li>
                    ))}
                </div>
            </div>
            <div className="category">
                <h2>Pasta</h2>
                <div className="product-list">
                    {category.Pasta.map((product) => (
                        <li key={product._id}>
                            <Products {...product} />
                        </li>
                    ))}
                </div>
            </div>
            <div className="category">
                <h2>Bebida</h2>
                <div className="product-list">
                    {category.Bebida.map((product) => (
                        <li key={product._id}>
                            <Products {...product} />
                        </li>
                    ))}
                </div>
            </div>
            <div className="category">
                <h2>Postre</h2>
                <div className="product-list">
                    {category.Postre.map((product) => (
                        <li key={product._id}>
                            <Products {...product} />
                        </li>
                    ))}
                </div>
            </div>
            {error && <ErrorMessage error={error} />}

        </div>
    );
}