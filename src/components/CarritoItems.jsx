const CarritoItem = ({ item, onRemove }) => {
    return (
        <li className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.price} €</p>
            </div>
            <button onClick={() => onRemove(item._id)}>Eliminar</button>
        </li>
    );
};

export default CarritoItem;