import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from './context/AuthContext.jsx'
import OrderContextProvider from './context/OrderContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <OrderContextProvider>
          <App />
        </OrderContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
