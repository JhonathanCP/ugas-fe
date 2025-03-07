import React from "react";
import { FaSearch } from "react-icons/fa";
import "../assets/main.css";

interface DashboardSearchBarProps {
    placeholder: string;
}

const DashboardSearchBar: React.FC<DashboardSearchBarProps> = ({ placeholder }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                className="search-bar"
            />
            <FaSearch className="search-icon" />
        </div>
    );
};

export default DashboardSearchBar;