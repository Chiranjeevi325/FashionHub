import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import orderService from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Save, Edit3, Package, ShoppingBag } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: '', phone: '',
        street: '', city: '', state: '', zip: '', country: 'India',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await authService.getProfile();
                setProfile(data);
                setForm({
                    name: data.name || '',
                    phone: data.phone || '',
                    street: data.address?.street || '',
                    city: data.address?.city || '',
                    state: data.address?.state || '',
                    zip: data.address?.zip || '',
                    country: data.address?.country || 'India',
                });
            } catch (error) {
                toast.error('Failed to load profile');
            }
            try {
                if (user?.role === 'customer') {
                    const orderData = await orderService.getOrders();
                    setOrders(orderData);
                }
            } catch (e) { /* no orders yet */ }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await authService.updateProfile({
                name: form.name,
                phone: form.phone,
                address: {
                    street: form.street,
                    city: form.city,
                    state: form.state,
                    zip: form.zip,
                    country: form.country,
                },
            });
            setProfile(updated);
            setEditing(false);
            toast.success('Profile updated!');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="profile-page"><p>Loading profile...</p></div>;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header-section">
                        <div className="profile-avatar">
                            <User size={40} />
                        </div>
                        <div>
                            <h1>{profile?.name}</h1>
                            <span className={`role-badge ${profile?.role}`}>{profile?.role}</span>
                        </div>
                        {!editing && (
                            <button className="edit-btn" onClick={() => setEditing(true)}>
                                <Edit3 size={16} /> Edit
                            </button>
                        )}
                    </div>

                    {!editing ? (
                        <div className="profile-details">
                            <div className="detail-row">
                                <Mail size={18} /> <span>{profile?.email}</span>
                            </div>
                            <div className="detail-row">
                                <Phone size={18} /> <span>{profile?.phone || 'Not set'}</span>
                            </div>
                            <div className="detail-row">
                                <MapPin size={18} />
                                <span>
                                    {profile?.address?.street
                                        ? `${profile.address.street}, ${profile.address.city}, ${profile.address.state} ${profile.address.zip}`
                                        : 'No address added'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-edit-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Enter phone number" />
                            </div>
                            <h4 className="address-title">Address</h4>
                            <div className="form-group">
                                <label>Street</label>
                                <input value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} placeholder="Street address" />
                            </div>
                            <div className="form-row-profile">
                                <div className="form-group">
                                    <label>City</label>
                                    <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>ZIP</label>
                                    <input value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-actions-profile">
                                <button className="btn-cancel-profile" onClick={() => setEditing(false)}>Cancel</button>
                                <button className="btn-save" onClick={handleSave} disabled={saving}>
                                    <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {user?.role === 'customer' && orders.length > 0 && (
                    <div className="orders-section">
                        <h2><Package size={22} /> My Orders</h2>
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order._id} className="order-card">
                                    <div className="order-header">
                                        <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                                        <span className={`order-status ${order.status}`}>{order.status}</span>
                                    </div>
                                    <div className="order-items-summary">
                                        {order.items.map((item, i) => (
                                            <span key={i}>{item.name} x{item.quantity}</span>
                                        ))}
                                    </div>
                                    <div className="order-footer">
                                        <span className="order-total">₹{order.total.toFixed(2)}</span>
                                        <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
