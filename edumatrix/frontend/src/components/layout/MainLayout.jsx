import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <TopNavbar />
                <main className="page-container">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
