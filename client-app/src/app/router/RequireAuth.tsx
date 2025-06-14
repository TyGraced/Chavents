import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireAuth() {
    const {userStore: {isLoggedIn}} = useStore();
    const loaction = useLocation();

    if (!isLoggedIn) {
        return <Navigate to='/' state={{from: loaction}} />
    }

    return <Outlet />
}