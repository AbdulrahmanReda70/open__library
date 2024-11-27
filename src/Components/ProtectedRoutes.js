import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Assuming you have this exported
import LoadingSpinner from "./LoadingSpinner";
function ProtectedRoutes() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });
    if (loading) return <LoadingSpinner />;
    return user ? <Outlet /> : <Navigate to="/signUp" replace />;
}

export default ProtectedRoutes;
