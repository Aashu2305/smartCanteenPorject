import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 👈 Import AuthContext

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // 👈 Get login function

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setMessage('');
        try {
            // First register the user
            const response = await axios.post('http://localhost:8080/api/auth/signup', formData);

            // If signup API also returns JWT token
            if (response.data.jwt) {
                login(response.data.jwt); // Save token in context
                navigate('/'); // Redirect to home
            } else {
                // If signup API does NOT return JWT, then do login manually
                const loginRes = await axios.post('http://localhost:8080/api/auth/login', {
                    username: formData.username,
                    password: formData.password
                });
                login(loginRes.data.jwt);
                navigate('/');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Registration failed. Username or email may already exist.');
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required onChange={handleChange} />
                </div>
                <button type="submit" className="auth-button">Sign Up</button>
                {message && <p className={`auth-message ${isError ? 'error' : 'success'}`}>{message}</p>}
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;

