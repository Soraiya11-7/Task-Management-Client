/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <div className="flex items-center min-h-screen justify-center">
           
            <span className="loading loading-infinity loading-lg flex items-center justify-center"></span>
        </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;