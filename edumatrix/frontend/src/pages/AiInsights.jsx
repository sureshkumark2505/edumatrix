import React, { useState, useEffect } from 'react';
import { Sparkle, Target, Brain, WarningCircle } from '@phosphor-icons/react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Radar, Bar } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
import { getStudentProfile, getStudentPerformance, getStudentEnrollments } from '../services/dataService';
import './AiInsights.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler);

const AiInsights = () => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [performance, setPerformance] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        const loadAiData = async () => {
            if (user?.role === 'student' && user?.studentId) {
                const [prof, perf, enrl] = await Promise.all([
                    getStudentProfile(user.studentId),
                    getStudentPerformance(user.studentId),
                    getStudentEnrollments(user.studentId)
                ]);
                setProfile(prof);
                setPerformance(perf);
                setEnrollments(enrl);
            }
            setLoading(false);
        };
        loadAiData();
    }, [user]);
    // Shared chart options
    // Shared chart options
    const commonOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: 'var(--text-secondary)', font: { family: 'var(--font-primary)' } } } },
        scales: {
            y: { grid: { color: 'var(--border-color)' }, ticks: { color: 'var(--text-tertiary)' }, min: 5, max: 10 },
            x: { grid: { display: false }, ticks: { color: 'var(--text-tertiary)' } }
        }
    };

    if (loading) {
        return <div className="insights-container"><h2 className="text-secondary">Running AI Models...</h2></div>;
    }

    if (!profile) {
        return <div className="insights-container"><h2 className="text-secondary">AI Insights restricted to Students.</h2></div>;
    }

    // Prepare Forecast Graph Data from state
    const actualGpaData = performance.map(p => p.is_predicted === 'FALSE' ? parseFloat(p.gpa) : null);
    const predGpaData = performance.map(p => p.is_predicted === 'TRUE' ? parseFloat(p.gpa) : null);

    // Connect the last actual point to the predicted line
    const lastActualIndex = actualGpaData.findLastIndex(val => val !== null);
    if (lastActualIndex !== -1 && predGpaData[lastActualIndex] === null) {
        predGpaData[lastActualIndex] = actualGpaData[lastActualIndex];
    }

    const forecastData = {
        labels: performance.map(p => `Sem ${p.semester_number} ${p.is_predicted === 'TRUE' ? '(AI Pred)' : ''}`),
        datasets: [
            {
                label: 'Actual GPA',
                data: actualGpaData,
                borderColor: 'var(--c-indigo)',
                backgroundColor: 'var(--c-indigo)',
                segment: { borderDash: ctx => ctx.p0DataIndex >= lastActualIndex ? [5, 5] : [] },
                tension: 0.4
            },
            {
                label: 'AI Predicted GPA',
                data: predGpaData,
                borderColor: 'var(--c-teal)',
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                borderDash: [5, 5],
                fill: true,
                tension: 0.4
            }
        ]
    };

    // Prepare Subject Radar Chart
    const radarData = {
        labels: enrollments.map(e => e.course_name || e.course_id),
        datasets: [{
            label: 'Current Competency',
            data: enrollments.map(e => parseInt(e.competency_level) || 0),
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'var(--c-primary-light)',
            pointBackgroundColor: 'var(--c-primary)',
        }, {
            label: 'Target Goal',
            data: enrollments.map(e => parseInt(e.target_goal) || 0),
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'var(--c-green)',
            borderDash: [5, 5]
        }]
    };

    // Radar specific options
    const radarOptions = {
        responsive: true, maintainAspectRatio: false,
        scales: { r: { angleLines: { color: 'var(--border-color)' }, grid: { color: 'var(--border-color)' }, pointLabels: { color: 'var(--text-secondary)' }, ticks: { display: false } } },
        plugins: { legend: { position: 'bottom', labels: { color: 'var(--text-secondary)' } } }
    };

    const predictedNextGPA = performance.find(p => p.is_predicted === 'TRUE')?.gpa || profile.current_cgpa;
    const gpaDelta = (predictedNextGPA - profile.current_cgpa).toFixed(2);

    return (
        <div className="insights-container">
            <div className="page-header">
                <div>
                    <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkle size={28} weight="fill" color="var(--c-primary-light)" />
                        AI Insights Center
                    </h1>
                    <p className="text-tertiary">Predictive analytics and personalized student growth models.</p>
                </div>
            </div>

            {/* AI Highlight Metrics */}
            <div className="ai-metrics-grid">
                <div className="ai-metric-card glass-panel border-glow-blue">
                    <div className="metric-header text-primary">Predicted Next Sem CGPA</div>
                    <div className="metric-value">{predictedNextGPA} <span className={`trend ${gpaDelta >= 0 ? 'positive' : 'negative'}`}>{gpaDelta >= 0 ? '↑' : '↓'} {Math.abs(gpaDelta)}</span></div>
                    <div className="metric-footer">Confidence Index: 89%</div>
                </div>

                <div className="ai-metric-card glass-panel border-glow-red">
                    <div className="metric-header text-red">Dropout Risk Score</div>
                    <div className="metric-value">{profile.dropout_risk_score}% <span className="trend positive">Based on Engagement</span></div>
                    <div className="metric-footer text-red">{profile.dropout_risk_score > 30 ? 'High Risk Threshold' : 'Low Risk Threshold'}</div>
                </div>

                <div className="ai-metric-card glass-panel border-glow-green">
                    <div className="metric-header text-green">Academic Stability Meter</div>
                    <div className="metric-value">{profile.academic_status} <span className="trend">Stable</span></div>
                    <div className="metric-footer">Based on 4-semester variance</div>
                </div>
            </div>

            {/* Main Visualizations Layout */}
            <div className="insights-layout">
                {/* Left Column: Charts */}
                <div className="charts-column">
                    <div className="chart-card glass-panel">
                        <div className="card-header">
                            <h3>Performance Projection Curve</h3>
                        </div>
                        <div className="chart-wrapper">
                            <Line data={forecastData} options={commonOptions} />
                        </div>
                    </div>

                    <div className="chart-card glass-panel">
                        <div className="card-header">
                            <h3>Subject Competency Radar</h3>
                        </div>
                        <div className="chart-wrapper">
                            <Radar data={radarData} options={radarOptions} />
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Suggestion Panel */}
                <div className="ai-panel-column">
                    <div className="ai-suggestion-panel glass-panel">
                        <div className="panel-header text-gradient">
                            <Brain size={24} weight="duotone" />
                            <h3>Einstein AI Assistant</h3>
                        </div>
                        <div className="panel-body">

                            <div className="suggestion-section">
                                <h4><Target size={18} /> Personalized Study Plan</h4>
                                <ul className="study-list">
                                    <li>Implement Pomodoro technique for <strong>Literature</strong> (weak subject detector).</li>
                                    <li>Allocate <strong>4 extra hours/week</strong> to complete Advanced Data Structures syllabus.</li>
                                    <li className="success-text">Maintain current rhythm in Computer Science (Strong Subject Indicator).</li>
                                </ul>
                            </div>

                            <div className="suggestion-section">
                                <h4><WarningCircle size={18} /> Concept Improvement Areas</h4>
                                <div className="concept-tags">
                                    <span className="tag urgent">Calculus Limits</span>
                                    <span className="tag warning">Modernist Poetry</span>
                                    <span className="tag normal">Organic Chemistry</span>
                                </div>
                            </div>

                            <div className="probability-box">
                                <div className="prob-header">
                                    <span>Improvement Probability</span>
                                    <strong>87%</strong>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '87%' }}></div>
                                </div>
                                <p>If personalized active study plan is followed for 3 weeks.</p>
                            </div>

                            <button className="btn-primary full-width mt-4">Generate Detailed PDE Plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiInsights;
