import { createContext, useState } from "react";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    const [orderProducts, setOrderProducts] = useState([])

    const addToOrder = (product) => {
        setOrderProducts(prev => [...prev, product]);
    };

    const removeFromOrder = (id) => {
        setOrderProducts((prevOrder) => prevOrder.filter((item) => item._id !== id));
    };

    const clearOrder = () => {
        setOrderProducts([]);
    };

    return (
        <OrderContext.Provider value={{ orderProducts, addToOrder, removeFromOrder, clearOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider