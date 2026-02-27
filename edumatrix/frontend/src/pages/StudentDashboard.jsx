import React, { useState, useEffect } from 'react';
import {
    GraduationCap, CalendarCheck, Fire,
    TrendUp, Trophy, Sparkle
} from '@phosphor-icons/react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
import { getStudentProfile, getStudentPerformance, getStudentEnrollments } from '../services/dataService';
import './StudentDashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const StudentDashboard = () => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [studentInfo, setStudentInfo] = useState(null);
    const [performance, setPerformance] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadStudentData = async () => {
            if (!user || user.role !== 'student' || !user.studentId) return;

            setLoading(true);
            try {
                const [profileData, perfData, enrollData] = await Promise.all([
                    getStudentProfile(user.studentId),
                    getStudentPerformance(user.studentId),
                    getStudentEnrollments(user.studentId)
                ]);

                setStudentInfo({
                    name: `${profileData.first_name} ${profileData.last_name}`,
                    id: profileData.student_id,
                    department: profileData.department,
                    year: `Year ${profileData.year_of_study}`,
                    gpa: profileData.current_cgpa,
                    xp: profileData.total_xp,
                    rank: profileData.global_rank,
                    streak: profileData.study_streak_days
                });
                setPerformance(perfData);
                setCourses(enrollData);
            } catch (err) {
                console.error("Failed loading student data", err);
            }
            setLoading(false);
        };

        loadStudentData();
    }, [user]);

    if (loading || !studentInfo) {
        return (
            <div className="student-dashboard-container" style={{ justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <h2 className="text-secondary">Loading Academic Data...</h2>
            </div>
        );
    }

    const gpaData = {
        labels: performance.map(p => `Sem ${p.semester_number} ${p.is_predicted === 'TRUE' ? '(AI Pred)' : ''}`),
        datasets: [{
            fill: true,
            label: 'Your GPA Trend',
            data: performance.map(p => parseFloat(p.gpa)),
            borderColor: 'var(--c-teal)',
            backgroundColor: 'rgba(20, 184, 166, 0.2)',
            borderDash: (ctx) => performance[ctx.p0DataIndex]?.is_predicted === 'TRUE' ? [5, 5] : [],
            tension: 0.4
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'var(--border-color)' }, ticks: { color: 'var(--text-tertiary)' } },
            x: { grid: { display: false }, ticks: { color: 'var(--text-tertiary)' } }
        }
    };



    return (
        <div className="student-dashboard-container">
            <div className="student-welcome-banner glass-panel border-left-teal">
                <div className="banner-content">
                    <h1>Welcome back, {studentInfo.name}! 👋</h1>
                    <p className="text-secondary">Here is your academic intelligence overview for today.</p>
                </div>
                <div className="banner-stats">
                    <div className="b-stat">
                        <span className="b-label">CGPA</span>
                        <span className="b-value text-teal">{studentInfo.gpa}</span>
                    </div>
                    <div className="b-stat">
                        <span className="b-label">Global Rank</span>
                        <span className="b-value text-orange">#{studentInfo.rank}</span>
                    </div>
                </div>
            </div>

            <div className="student-stats-grid">
                <div className="s-stat-card glass-panel badge-glow">
                    <div className="icon-wrapper bg-indigo">
                        <GraduationCap size={24} weight="fill" color="var(--c-indigo)" />
                    </div>
                    <div className="s-stat-info">
                        <h3>{studentInfo.department}</h3>
                        <p>{studentInfo.year} • ID: {studentInfo.id}</p>
                    </div>
                </div>

                <div className="s-stat-card glass-panel badge-glow">
                    <div className="icon-wrapper bg-orange">
                        <Fire size={24} weight="fill" color="var(--c-orange)" />
                    </div>
                    <div className="s-stat-info">
                        <h3>{studentInfo.streak} Days</h3>
                        <p>Active Study Streak</p>
                    </div>
                </div>

                <div className="s-stat-card glass-panel badge-glow">
                    <div className="icon-wrapper bg-primary">
                        <Trophy size={24} weight="fill" color="var(--c-primary-light)" />
                    </div>
                    <div className="s-stat-info">
                        <h3>{studentInfo.xp} XP</h3>
                        <p>Total Experience Points</p>
                    </div>
                </div>
            </div>

            <div className="student-main-grid layout-2-col">
                <div className="chart-card glass-panel">
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendUp size={20} className="text-teal" />
                            Performance Trajectory
                        </h3>
                    </div>
                    <div className="chart-wrapper">
                        <Line data={gpaData} options={chartOptions} />
                    </div>
                </div>

                <div className="course-card glass-panel">
                    <div className="card-header">
                        <h3>Current Enrolled Courses</h3>
                        <button className="btn-secondary-small">View All</button>
                    </div>
                    <div className="course-list">
                        {courses.map((course, idx) => (
                            <div className="c-item" key={idx}>
                                <div className="c-info">
                                    <h4>{course.course_name}</h4>
                                    <span>{course.course_id}</span>
                                </div>
                                <div className="c-score">
                                    <div className="score-badge text-teal">{course.grade}</div>
                                    <span className="pct">{course.score_percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="ai-insight-mini mt-4 glass-panel border-glow-blue">
                        <div className="insight-top">
                            <Sparkle size={18} color="var(--c-primary-light)" weight="fill" />
                            <span className="text-primary font-bold">Einstein AI Suggestions</span>
                        </div>
                        <p className="mt-2 text-sm text-secondary">
                            Your performance in <strong>Data Structures</strong> is outstanding. Consider enrolling in <strong>Advanced Algorithms</strong> next semester to fulfill your Machine Learning Engineer career track.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
