import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { username, password });
            console.log('Signup successful:', response.data);
            navigate('/login'); // Navigate to login page on successful signup
        } catch (error) {
            console.error('Error during signup:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className='login'>
        <form onSubmit={handleSignup} className='robin'>
           <div className='jan'><label>Username:</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  /></div>
           <div className='jann'><label>Password:</label> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <button type="submit">Signup</button>
            {error && <p>{error}</p>}
        </form></div>
    );
};

export default Signup;
