const Orders = ({ createdAt, status, totalPrice, deliveryAddress }) => {
  return (
    <div className="order-card">
      <p className="order-date">{new Date(createdAt).toLocaleDateString()}</p>
      <p className="order-date">{deliveryAddress}</p>
      <div className="order-info">
        <p className={`order-status ${status.toLowerCase()}`}>{status}</p>
        <p className="order-price">{totalPrice}€</p>
      </div>
    </div>
  );
};

export default Orders