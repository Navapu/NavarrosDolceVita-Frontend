import {createContext, useState } from "react";

export const OrderContext = createContext();

const OrderContextProvider = ({children}) => {
    const [orderProducts, setOrderProducts] = useState([])

    const addToOrder = (product) => {
    setOrderProducts(prev => [...prev, product]);
  };
    
    return(
        <OrderContext.Provider value={{orderProducts, addToOrder}}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider