import React from 'react';
import { Package } from 'lucide-react';

const StatsCard = ({ title, value, type }) => {
    return (
        <div className="stat-card">
            <div className="stat-icon">
                <Package size={20} />
            </div>
            <div className="stat-info">
                <span className="stat-label">{title}</span>
                <div className="stat-value">{value}</div>
            </div>
        </div>
    );
};

export default StatsCard;
