import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

const SearchBar = ({ onSearch }) => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="search-input-wrapper">
            <Search size={18} />
            <input
                type="text"
                placeholder="SEARCH FOR STYLES..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
