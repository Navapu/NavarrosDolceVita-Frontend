import './App.css'
import { Routes, Route } from "react-router";
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Order } from './pages/Order'
import { Profile } from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { OrderDetails } from './pages/OrderDetails';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Order />} />

        <Route path="/orders/:id" element={
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        } />

        <Route path='/profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
