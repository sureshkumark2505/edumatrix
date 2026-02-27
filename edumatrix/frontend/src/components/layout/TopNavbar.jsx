import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MagnifyingGlass, Bell, Moon, Sun,
    Robot, CaretDown, SignOut
} from '@phosphor-icons/react';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './TopNavbar.css';

const TopNavbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getDisplayName = () => {
        if (!user) return "Guest";
        switch (user.role) {
            case 'student': return "Emma Wright";
            case 'parent': return "Emma's Parent";
            case 'staff': return "Prof. Alan Turing";
            case 'admin': return "Dr. Sarah Cole";
            default: return user.email;
        }
    };

    const getRoleTitle = () => {
        if (!user) return "System Visitor";
        switch (user.role) {
            case 'student': return "Computer Science • Yr 2";
            case 'parent': return "Parent Monitor";
            case 'staff': return "Senior Lecturer";
            case 'admin': return "Dean of Analytics";
            default: return "User";
        }
    };

    return (
        <header className="top-navbar glass-panel">
            <div className="search-bar">
                <MagnifyingGlass size={20} className="search-icon" />
                <input type="text" placeholder="Search students, courses, analytics..." />
            </div>

            <div className="nav-actions">
                <button className="icon-btn" onClick={toggleTheme}>
                    {theme === 'light' ? <Moon size={22} weight="fill" /> : <Sun size={22} weight="fill" />}
                </button>

                <button className="icon-btn">
                    <Bell size={22} weight="fill" />
                    <span className="badge">3</span>
                </button>

                <button className="icon-btn ai-btn">
                    <Robot size={22} weight="duotone" />
                </button>

                <div className="user-profile">
                    <div className="avatar">
                        <img src={`https://ui-avatars.com/api/?name=${getDisplayName().replace(' ', '+')}&background=3B82F6&color=fff`} alt="User" />
                    </div>
                    <div className="user-info">
                        <span className="name">{getDisplayName()}</span>
                        <span className="role">{getRoleTitle()}</span>
                    </div>
                    <CaretDown size={16} weight="bold" />
                </div>

                <button className="icon-btn logout-btn" title="Logout" onClick={handleLogout} style={{ marginLeft: '8px', color: 'var(--c-red)' }}>
                    <SignOut size={22} weight="bold" />
                </button>
            </div>
        </header>
    );
};

export default TopNavbar;
