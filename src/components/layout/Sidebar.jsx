import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
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
                <NavLink to="/dashboard/settings" title="Settings">
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
