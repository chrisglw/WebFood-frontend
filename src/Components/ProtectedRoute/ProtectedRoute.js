import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    // Check if user is logged in
    if (!token) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    // Check if user role matches the required role
    // If requiredRole is "manager", only manager should proceed
    // If requiredRole is "staff", manager or staff should proceed

    if (requiredRole === 'manager' && userRole !== 'manager') {
        return <Navigate to="/" replace />;
    }

    if (requiredRole === 'staff' && !(userRole === 'manager' || userRole === 'staff')) {
        return <Navigate to="/" replace />;
    }

    // If no specific role required (public), just allow
    if (!requiredRole) {
        return children;
    }

    return children;
};

export default ProtectedRoute;
