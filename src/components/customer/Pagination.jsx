import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ current, total, onChange }) => {
    if (total <= 1) return null;

    return (
        <div className="pagination-market" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
                disabled={current === 1}
                onClick={() => onChange(current - 1)}
                className="page-btn-pill"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFF',
                    cursor: current === 1 ? 'not-allowed' : 'pointer'
                }}
            >
                <ChevronLeft size={18} />
            </button>

            {[...Array(total)].map((_, i) => (
                <button
                    key={i + 1}
                    className={`page-num ${current === i + 1 ? 'active' : ''}`}
                    onClick={() => onChange(i + 1)}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: 'none',
                        background: current === i + 1 ? 'var(--primary)' : 'transparent',
                        color: current === i + 1 ? '#FFF' : '#333',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                    }}
                >
                    {i + 1}
                </button>
            ))}

            <button
                disabled={current === total}
                onClick={() => onChange(current + 1)}
                className="page-btn-pill"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFF',
                    cursor: current === total ? 'not-allowed' : 'pointer'
                }}
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;
