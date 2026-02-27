import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    SquaresFour, Users, Brain, ChartLineUp,
    Student, SlidersHorizontal, Trophy
} from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { user } = useAuth();
    const role = user?.role || 'admin'; // fallback for demo

    return (
        <aside className="sidebar glass-panel">
            <div className="brand">
                <div className="logo-box text-gradient">E²</div>
                <h2>EduMatrix <span className="text-gradient">AI</span></h2>
            </div>

            <nav className="nav-menu">
                <div className="nav-label">Overview</div>

                {(role === 'admin' || role === 'staff') && (
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <SquaresFour size={24} weight="duotone" />
                        <span>Admin Dashboard</span>
                    </NavLink>
                )}

                {(role === 'student' || role === 'parent') && (
                    <NavLink to="/student-dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Student size={24} weight="duotone" />
                        <span>Student Dashboard</span>
                    </NavLink>
                )}

                <div className="nav-label">Intelligence</div>

                {(role === 'admin' || role === 'student') && (
                    <NavLink to="/ai-insights" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Brain size={24} weight="duotone" />
                        <span>AI Insights</span>
                    </NavLink>
                )}

                {(role === 'admin' || role === 'staff') && (
                    <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <ChartLineUp size={24} weight="duotone" />
                        <span>Analytics Lab</span>
                    </NavLink>
                )}

                {(role === 'admin' || role === 'student') && (
                    <NavLink to="/career" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Student size={24} weight="duotone" />
                        <span>Career Match</span>
                    </NavLink>
                )}

                {(role === 'admin' || role === 'student') && (
                    <NavLink to="/gamification" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Trophy size={24} weight="duotone" />
                        <span>Gamification</span>
                    </NavLink>
                )}

                <div className="nav-label">Portals</div>

                {(role === 'admin' || role === 'parent') && (
                    <NavLink to="/parent" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <Users size={24} weight="duotone" />
                        <span>Parent Portal</span>
                    </NavLink>
                )}

                {(role === 'admin') && (
                    <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <SlidersHorizontal size={24} weight="duotone" />
                        <span>Admin Control</span>
                    </NavLink>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
