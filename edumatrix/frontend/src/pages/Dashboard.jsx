import React, { useState, useEffect } from 'react';
import {
    Users, GraduationCap, WarningCircle,
    CalendarCheck, TrendUp
} from '@phosphor-icons/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { getGlobalStats } from '../services/dataService';
import './Dashboard.css';

// Register ChartJS Components
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: 'var(--text-secondary)',
                font: { family: 'var(--font-primary)' }
            }
        },
    },
    scales: {
        y: {
            grid: { color: 'var(--border-color)' },
            ticks: { color: 'var(--text-tertiary)' }
        },
        x: {
            grid: { display: false },
            ticks: { color: 'var(--text-tertiary)' }
        }
    }
};

const Dashboard = () => {
    const [globalStats, setGlobalStats] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            const data = await getGlobalStats();
            setGlobalStats(data);
        };
        loadStats();
    }, []);

    // Mock Data for Widgets (with dynamic overrides where available)
    const stats = [
        { title: "Total Students", value: globalStats ? globalStats.totalStudents : "...", icon: <Users size={24} />, color: "var(--c-primary-light)", trend: "+2.4%" },
        { title: "Average CGPA", value: globalStats ? globalStats.averageGpa : "...", icon: <GraduationCap size={24} />, color: "var(--c-indigo)", trend: "+0.1" },
        { title: "At-Risk Students", value: globalStats ? globalStats.atRiskStudents : "...", icon: <WarningCircle size={24} />, color: "var(--c-red)", trend: "-12%" },
        { title: "Attendance Rate", value: "91.5%", icon: <CalendarCheck size={24} />, color: "var(--c-teal)", trend: "+1.2%" },
        { title: "Performance Growth", value: "4.2%", icon: <TrendUp size={24} />, color: "var(--c-green)", trend: "+0.8%" }
    ];

    // Mock Data for Line Chart (Performance Trend)
    const performanceData = {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
        datasets: [{
            fill: true,
            label: 'University Average GPA',
            data: [3.1, 3.15, 3.2, 3.3, 3.35, 3.42],
            borderColor: 'var(--c-indigo)',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            tension: 0.4
        }]
    };

    // Mock Data for Bar Chart (Subject Performance)
    const subjectData = {
        labels: ['CS 101', 'Math 202', 'Phys 301', 'Bio 105', 'Eng 101'],
        datasets: [{
            label: 'Average Score (%)',
            data: [78, 85, 62, 91, 88],
            backgroundColor: 'var(--c-primary-light)',
            borderRadius: 6
        }]
    };

    // Mock Data for Doughnut Chart (Attendance)
    const attendanceData = {
        labels: ['Present', 'Absent', 'Excused'],
        datasets: [{
            data: [91.5, 5.5, 3.0],
            backgroundColor: ['var(--c-teal)', 'var(--c-red)', 'var(--c-primary-light)'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    return (
        <div className="dashboard-container">
            <div className="page-header">
                <div>
                    <h1>Intelligent Dashboard</h1>
                    <p className="text-tertiary">Real-time overview of university performance metrics.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary">Export Report</button>
                    <button className="btn-primary">Generate Insights</button>
                </div>
            </div>

            {/* Stat Widgets */}
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div className="stat-card glass-panel" key={idx}>
                        <div className="stat-header">
                            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                                {stat.icon}
                            </div>
                            <span className={`stat-trend ${stat.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div className="stat-content">
                            <h3>{stat.value}</h3>
                            <p>{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="charts-grid layout-2-col">
                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3>Semester Performance Trend</h3>
                    </div>
                    <div className="chart-wrapper">
                        <Line data={performanceData} options={chartOptions} />
                    </div>
                </div>

                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3>Subject Performance Analysis</h3>
                    </div>
                    <div className="chart-wrapper">
                        <Bar data={subjectData} options={
                            { ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }
                        } />
                    </div>
                </div>
            </div>

            <div className="charts-grid layout-3-col">
                <div className="chart-card glass-panel span-2">
                    <div className="card-header">
                        <h3>Grade Distribution (Overall)</h3>
                    </div>
                    <div className="chart-wrapper">
                        {/* Re-using Bar Config differently as a placeholder for distribution */}
                        <Bar data={{
                            labels: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
                            datasets: [{
                                data: [15, 25, 20, 15, 10, 8, 5, 2],
                                backgroundColor: 'var(--c-indigo)',
                                borderRadius: 4
                            }]
                        }} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
                    </div>
                </div>

                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3>Overall Attendance</h3>
                    </div>
                    <div className="chart-wrapper attendance-chart">
                        <Doughnut data={attendanceData} options={{
                            responsive: true, maintainAspectRatio: false, cutout: '75%',
                            plugins: { legend: { position: 'bottom', labels: { color: 'var(--text-secondary)' } } }
                        }} />
                        <div className="doughnut-center">
                            <h4>91.5%</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
