import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    if (user) return children;
    return <Navigate to="/login" />;
};

export default PrivateRoute;
