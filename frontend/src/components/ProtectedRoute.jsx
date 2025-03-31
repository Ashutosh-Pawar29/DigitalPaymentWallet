import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const token = localStorage.getItem("Token"); // Check if token exists

    return token ? <Outlet /> : <Navigate to="/login" />;
};
