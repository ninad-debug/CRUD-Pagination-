import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { getUserName } from "../utils";

export default function ProtectedRoute() {

    let auth = getUserName();
    const navigate = useNavigate();
    
    useEffect(() => {

        if(auth === null){
            navigate("/signin", {replace: true})
        }
    })

    return <Outlet />
}