import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './components/styles.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Compose from './components/compose';
import ProtectedRoute from './components/ProtectedRoute';
import PostDetail from './components/PostDetail';
import Logout from './components/Logout';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [posts] = useState([]);

    // Check if there's an item in localStorage indicating the user is logged in on component mount
    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('id'); // Remove the 'id' from localStorage
        setIsLoggedIn(false); // Update state to reflect logged out status
    };

    return (
        <Router>
           
            <nav className='navbar'>
                
            <div className="anime-container">
                {/* <img src="https://imgs.search.brave.com/2ju6h5phHTzDb1y9nRRlWzIPAL54WNF8ZzFkFondO2c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLnR1cmJvbG9n/by5jb20vdXBsb2Fk/cy9kZXNpZ24vcHJl/dmlld19pbWFnZS80/NTUxODM1L3ByZXZp/ZXdfaW1hZ2UyMDIx/MTIyNC04NjQ3LTFn/N2RsZDMucG5n" alt="Anime 1" className="anime-img" /> */}
            <h1 className='logo-text' ><samp>ANIME</samp>WAVE</h1>
            </div>
                
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <Logout onLogout={handleLogout} />
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/compose">Compose</Link>
                    </li>
                </ul>
            </nav>
        
            <Routes>
                <Route path="/" element={<Home posts={posts} />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/compose" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Compose />
                    </ProtectedRoute>
                } />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </Router>
        
    );
};

export default App;
