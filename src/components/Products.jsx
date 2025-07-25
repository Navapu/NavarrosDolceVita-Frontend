import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
export const Products = ({_id, imageUrl, name, price, description}) => {
    const {addToOrder} = useContext(OrderContext);

    const handleOrder = () => {
        addToOrder ({
            _id,
            imageUrl,
            name,
            description,
            price
        })
    }
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="price">{price}€</p>
            <button onClick={handleOrder}>Añadir al pedido</button>
        </div>
    )
}