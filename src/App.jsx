import './App.css'
import { Routes, Route } from "react-router";
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Menu } from './pages/Menu'
import { Profile } from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { OrderDetails } from './pages/OrderDetails';
import { Error404 } from './pages/Error404';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/menu' element={<Menu />} />

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

        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
