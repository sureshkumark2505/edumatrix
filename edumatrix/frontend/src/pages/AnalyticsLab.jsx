import React, { useState } from 'react';
import { Funnel, DownloadSimple, Clock, Building } from '@phosphor-icons/react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import './AnalyticsLab.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsLab = () => {
    const [department, setDepartment] = useState('All');

    // Shared chart options
    const commonOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { color: 'var(--text-secondary)' } } },
        scales: {
            y: { grid: { color: 'var(--border-color)' }, ticks: { color: 'var(--text-tertiary)' } },
            x: { grid: { display: false }, ticks: { color: 'var(--text-tertiary)' } }
        }
    };

    // 1. CGPA Distribution Histogram (Bar)
    const cgpaDistribution = {
        labels: ['< 2.0', '2.0-2.5', '2.5-3.0', '3.0-3.5', '3.5-4.0'],
        datasets: [{
            label: 'Number of Students',
            data: [150, 400, 1200, 2500, 1800],
            backgroundColor: 'var(--c-indigo)',
            borderRadius: 4,
            barPercentage: 1.0,
            categoryPercentage: 1.0,
        }]
    };

    // 2. Department Comparison (Grouped Bar)
    const deptComparison = {
        labels: ['CS', 'Engineering', 'Business', 'Arts', 'Science'],
        datasets: [
            { label: 'Pass Rate (%)', data: [88, 85, 92, 95, 87], backgroundColor: 'var(--c-teal)' },
            { label: 'Avg GPA', data: [3.4, 3.2, 3.6, 3.8, 3.3], backgroundColor: 'var(--c-primary-light)' }
        ]
    };

    // 3. Performance Clustering Visualization (Scatter)
    const scatterData = {
        datasets: [{
            label: 'Student Clusters (Attendance vs GPA)',
            data: Array.from({ length: 50 }, () => ({
                x: Math.floor(Math.random() * 40) + 60, // Attendance 60-100
                y: (Math.random() * 2 + 2).toFixed(2) // GPA 2.0-4.0
            })),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'var(--c-primary)',
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    };

    // 4. Performance Variance (Line with Fill)
    const varianceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            fill: true,
            label: 'Variance +/- (%)',
            data: [1.2, -0.5, 2.3, 0.4, -1.8, 3.1],
            borderColor: 'var(--c-secondary)',
            backgroundColor: 'rgba(156, 163, 175, 0.2)',
            tension: 0.3
        }]
    };

    return (
        <div className="analytics-container">
            <div className="page-header">
                <div>
                    <h1>Analytics Lab</h1>
                    <p className="text-tertiary">Advanced data science and macro-level university reporting.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary"><DownloadSimple size={18} /> Export CSV</button>
                    <button className="btn-primary">Generate PDF Report</button>
                </div>
            </div>

            {/* Filter Panel */}
            <div className="filter-panel glass-panel">
                <div className="filter-group">
                    <div className="filter-item">
                        <Building size={18} className="text-secondary" />
                        <select onChange={(e) => setDepartment(e.target.value)}>
                            <option value="All">All Departments</option>
                            <option value="CS">Computer Science</option>
                            <option value="ENG">Engineering</option>
                            <option value="BUS">Business</option>
                        </select>
                    </div>

                    <div className="filter-item">
                        <Clock size={18} className="text-secondary" />
                        <select>
                            <option>Fall 2025</option>
                            <option>Spring 2026</option>
                            <option>Fall 2026 (Active)</option>
                        </select>
                    </div>

                    <div className="filter-item">
                        <Funnel size={18} className="text-secondary" />
                        <select>
                            <option>Year: All</option>
                            <option>Freshmen</option>
                            <option>Sophomore</option>
                        </select>
                    </div>
                </div>

                <button className="btn-secondary-small">Apply Filters</button>
            </div>

            {/* Top Charts */}
            <div className="charts-grid layout-2-col">
                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3>CGPA Distribution Histogram</h3>
                    </div>
                    <div className="chart-wrapper">
                        <Bar data={cgpaDistribution} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
                    </div>
                </div>

                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3>Department Comparison Matrix</h3>
                    </div>
                    <div className="chart-wrapper">
                        <Bar data={deptComparison} options={commonOptions} />
                    </div>
                </div>
            </div>

            {/* Bottom Charts */}
            <div className="charts-grid layout-2-col">
                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3>Performance Clustering (Attendance vs. GPA)</h3>
                    </div>
                    <div className="chart-wrapper">
                        <Scatter data={scatterData} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
                    </div>
                </div>

                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3>Performance Variance Analysis</h3>
                    </div>
                    <div className="chart-wrapper">
                        <Line data={varianceData} options={commonOptions} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AnalyticsLab;
