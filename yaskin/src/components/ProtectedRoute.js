import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => { // Receive isLoggedIn from props
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
