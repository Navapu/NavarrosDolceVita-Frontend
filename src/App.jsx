import './App.css'
import { Routes, Route } from "react-router";
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Carta } from './pages/Carta'
import { Profile } from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { OrderDetails } from './pages/OrderDetails';
import { Error404 } from './pages/Error404';
import { Carrito } from './pages/Carrito';
import { ProtectedRouteAdmin } from './components/ProtectedRouteAdmin';
import { AdminOrders } from './pages/AdminOrders';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/carta' element={<Carta />} />
        <Route path='/carrito' element={<Carrito />} />

        <Route path="/pedidos/:id" element={
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        } />

        <Route path="/pedidos/admin" element={
          <ProtectedRouteAdmin>
            <AdminOrders />
          </ProtectedRouteAdmin>
        } />

        <Route path='/perfil' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
