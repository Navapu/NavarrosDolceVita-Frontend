import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
const PrivateRoute = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to="/login" />
}
 
export default PrivateRoute;