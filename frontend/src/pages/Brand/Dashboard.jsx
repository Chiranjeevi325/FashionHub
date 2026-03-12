import React, { useState, useEffect } from 'react';
import brandService from '../../services/brandService';
import StatsCard from '../../components/brand/StatsCard';
import ProductTable from '../../components/brand/ProductTable';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, archived: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await brandService.getStats();
                setStats(data);
            } catch (error) {
                // Fallback for mock/dev
                console.warn('Backend not available, using mock stats');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="brand-dashboard">
            <header className="dashboard-header">
                <h1>Dashboard Overview</h1>
                <p>Your brand's performance at a glance.</p>
            </header>

            <div className="stats-grid">
                <StatsCard title="Total Products" value={stats.total} type="all" />
                <StatsCard title="Published" value={stats.published} type="published" />
                <StatsCard title="Drafts" value={stats.draft} type="draft" />
                <StatsCard title="Archived" value={stats.archived} type="archived" />
            </div>

            <div className="recent-activity glass">
                <h3>Recent Products</h3>
                <ProductTable limit={5} />
            </div>
        </div>
    );
};

export default Dashboard;
