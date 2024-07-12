import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => { // Receive onLogout function from props
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('id'); // Remove the 'id' from localStorage
        onLogout(); // Call parent component function to update isLoggedIn state
        navigate('/'); // Redirect to the home page after logout
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
