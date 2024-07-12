import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => { // Receive setIsLoggedIn from props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            const id=await response.data.sucess.id;
            console.log(response.data.sucess);
            localStorage.setItem('id', id); // Store 'id' in localStorage
            setIsLoggedIn(true); // Update parent component state to reflect logged in status
            navigate('/compose'); // Redirect to compose page after successful login
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred during login');
            }
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='login'>
            
        <form onSubmit={handleLogin} className='robin'>
            <div className='jan'>
                <label >Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='jann'>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
        </div>
    );
};

export default Login;
