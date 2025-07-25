export const Products = ({imageUrl, name, price}) => {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <p>{price}€</p>
        </div>
    )
}