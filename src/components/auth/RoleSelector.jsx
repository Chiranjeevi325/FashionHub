import React from 'react';
import { USER_ROLES } from '../../utils/constants';

const RoleSelector = ({ selectedRole, onChange }) => {
    return (
        <div className="role-selector">
            <button
                type="button"
                className={selectedRole === USER_ROLES.CUSTOMER ? 'active' : ''}
                onClick={() => onChange(USER_ROLES.CUSTOMER)}
            >
                Customer
            </button>
            <button
                type="button"
                className={selectedRole === USER_ROLES.BRAND ? 'active' : ''}
                onClick={() => onChange(USER_ROLES.BRAND)}
            >
                Brand
            </button>
        </div>
    );
};

export default RoleSelector;
