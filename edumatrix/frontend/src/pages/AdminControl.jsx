import React from 'react';
import { Database, HardDrives, UsersThree, ShieldCheck, CheckCircle, Warning } from '@phosphor-icons/react';
import './AdminControl.css';

const AdminControl = () => {
    const sysHealth = [
        { label: 'API Status', status: 'Operational', icon: <CheckCircle weight="fill" color="var(--c-green)" /> },
        { label: 'Database Sync', status: 'Delayed (2m)', icon: <Warning weight="fill" color="var(--c-orange)" /> },
        { label: 'AI Prediction Engine', status: 'Operational', icon: <CheckCircle weight="fill" color="var(--c-green)" /> }
    ];

    return (
        <div className="admin-container">
            <div className="page-header">
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldCheck size={28} weight="fill" color="var(--c-red)" />
                        Admin Control Center
                    </h1>
                    <p className="text-tertiary">System infrastructure, users, and security configuration.</p>
                </div>
            </div>

            {/* System Status Row */}
            <div className="sys-status-grid">
                <div className="sys-card glass-panel">
                    <HardDrives size={24} className="text-primary" />
                    <div className="sys-info">
                        <h4>System Uptime</h4>
                        <p>99.98% / 42 Days</p>
                    </div>
                </div>

                <div className="sys-card glass-panel">
                    <UsersThree size={24} className="text-teal" />
                    <div className="sys-info">
                        <h4>Active Sessions</h4>
                        <p>1,245 Online</p>
                    </div>
                </div>

                <div className="sys-card glass-panel">
                    <Database size={24} className="text-indigo" />
                    <div className="sys-info">
                        <h4>Storage Usage</h4>
                        <p>4.2 TB / 10 TB</p>
                    </div>
                </div>
            </div>

            <div className="admin-layout">
                <div className="admin-actions-column">
                    <div className="action-card glass-panel">
                        <div className="card-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div className="action-grid">
                            <button className="admin-btn"><UsersThree /> Manage Users</button>
                            <button className="admin-btn"><ShieldCheck /> Role Permissions</button>
                            <button className="admin-btn"><Database /> Backup DB</button>
                        </div>
                    </div>
                </div>

                <div className="admin-health-column">
                    <div className="action-card glass-panel">
                        <div className="card-header">
                            <h3>Microservices Health</h3>
                        </div>
                        <div className="health-list">
                            {sysHealth.map((item, idx) => (
                                <div className="health-item" key={idx}>
                                    <div className="health-label">{item.label}</div>
                                    <div className="health-status">
                                        {item.status}
                                        {item.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminControl;
