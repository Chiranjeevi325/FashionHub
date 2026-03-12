import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password, role);
        navigate(role === 'brand' ? '/dashboard' : '/');
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your MarketNest account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="role-selector">
                        <button
                            type="button"
                            className={role === 'customer' ? 'active' : ''}
                            onClick={() => setRole('customer')}
                        >
                            Customer
                        </button>
                        <button
                            type="button"
                            className={role === 'brand' ? 'active' : ''}
                            onClick={() => setRole('brand')}
                        >
                            Brand
                        </button>
                    </div>

                    <div className="input-group">
                        <Mail size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-premium w-full auth-btn">
                        Login <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
