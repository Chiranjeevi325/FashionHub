import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight, Building } from 'lucide-react';
import './Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(name, email, password, role);
            navigate(role === 'brand' ? '/dashboard' : '/');
        } catch (error) {
            // Error is handled in AuthContext (toast), so just catch here to stop navigation
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <div className="auth-header">
                    <h1>Join MarketNest</h1>
                    <p>Create an account to start exploring</p>
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
                        <UserIcon size={20} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
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

                    <button type="submit" className="btn-premium w-full auth-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
