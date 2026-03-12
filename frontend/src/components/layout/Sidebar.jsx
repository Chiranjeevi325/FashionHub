import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <aside className="brand-sidebar">
            <div className="sidebar-header">
                <Link to="/dashboard" className="logo">Market<span>Nest</span></Link>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" end title="Overview">
                    <LayoutDashboard size={20} />
                    <span>Overview</span>
                </NavLink>
                <NavLink to="/dashboard/products" title="My Products">
                    <ShoppingBag size={20} />
                    <span>Products</span>
                </NavLink>
                <NavLink to="/dashboard/products/create" title="Add New">
                    <PlusCircle size={20} />
                    <span>Add Product</span>
                </NavLink>
                <NavLink to="/dashboard/profile" title="Profile">
                    <User size={20} />
                    <span>Profile</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button onClick={logout} className="sidebar-logout">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
