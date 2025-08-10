import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 👈 Import AuthContext
import './Signup.css';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const { login } = useContext(AuthContext); // 👈 Get the login function
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setMessage('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            
            // On successful login, use the context to save the token
            login(response.data.jwt);
            
            setMessage('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            setIsError(true);
            setMessage('Login failed. Please check your username and password.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Log In to Your Account</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required onChange={handleChange} />
                </div>
                <button type="submit" className="auth-button">Log In</button>
                {message && <p className={`auth-message ${isError ? 'error' : 'success'}`}>{message}</p>}
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
