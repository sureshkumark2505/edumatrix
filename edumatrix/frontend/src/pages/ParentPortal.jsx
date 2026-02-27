import React, { useState, useEffect } from 'react';
import { DownloadSimple, ChatText, ChartLineUp, Student, CalendarCheck } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
import { getStudentProfile, getStudentFeedback } from '../services/dataService';
import './ParentPortal.css';

const ParentPortal = () => {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const loadParentData = async () => {
            // Demo fallback: if a parent logs in, use their child ID (or hardcode CMD-00101 for demo purposes)
            const targetStudentId = user?.studentId || 'CMD-00101';

            if (user?.role === 'parent' || user?.role === 'admin') {
                const [prof, fbs] = await Promise.all([
                    getStudentProfile(targetStudentId),
                    getStudentFeedback(targetStudentId)
                ]);
                setProfile(prof);
                setFeedbacks(fbs);
            }
            setLoading(false);
        };
        loadParentData();
    }, [user]);

    if (loading) {
        return <div className="parent-container"><h2 className="text-secondary">Loading Profile...</h2></div>;
    }

    if (!profile) {
        return <div className="parent-container"><h2 className="text-secondary">Access Restricted. Parent or Admin role required.</h2></div>;
    }

    return (
        <div className="parent-container">
            <div className="page-header">
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Student size={28} weight="fill" color="var(--c-teal)" />
                        Parent Monitoring Portal
                    </h1>
                    <p className="text-tertiary">Real-time academic and behavioral insights for your child.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary"><DownloadSimple size={18} /> Report Card</button>
                    <button className="btn-primary"><ChatText size={18} /> Message Teachers</button>
                </div>
            </div>

            <div className="student-profile glass-panel">
                <div className="avatar profile-large">
                    <img src={`https://ui-avatars.com/api/?name=${profile.first_name}+${profile.last_name}&background=10B981&color=fff`} alt="Student" />
                </div>
                <div className="profile-info">
                    <h2>{profile.first_name} {profile.last_name}</h2>
                    <p>{profile.department} • Year {profile.year_of_study} • Student ID: #{profile.student_id}</p>
                </div>
                <div className={`status-badge ${profile.academic_status === 'Stable' ? 'stable' : 'at-risk'}`}>
                    Academic Status: {profile.academic_status}
                </div>
            </div>

            <div className="parent-layout">
                {/* Metrics */}
                <div className="metrics-column">
                    <div className="stat-card glass-panel border-left-blue">
                        <div className="stat-header">
                            <div className="stat-icon text-primary"><ChartLineUp size={24} weight="duotone" /></div>
                        </div>
                        <div className="stat-content">
                            <h3>{profile.current_cgpa}</h3>
                            <p>Current CGPA</p>
                        </div>
                    </div>

                    <div className="stat-card glass-panel border-left-teal">
                        <div className="stat-header">
                            <div className="stat-icon text-teal"><CalendarCheck size={24} weight="duotone" /></div>
                        </div>
                        <div className="stat-content">
                            <h3>{profile.attendance_rate || '96%'}</h3>
                            <p>Attendance Rate</p>
                        </div>
                    </div>
                </div>

                {/* Teacher Feedback */}
                <div className="feedback-column">
                    <div className="feedback-card glass-panel">
                        <div className="card-header">
                            <h3>Recent Teacher Feedback</h3>
                        </div>
                        <div className="feedback-list">
                            {feedbacks.length === 0 ? (
                                <p className="text-tertiary">No recent feedback available.</p>
                            ) : (
                                feedbacks.map((fb, idx) => (
                                    <div className="feedback-item" key={idx}>
                                        <div className="feedback-meta">
                                            <span className="teacher">{fb.teacher_name} • {fb.course_name}</span>
                                            <span className="date">{fb.date_posted}</span>
                                        </div>
                                        <p className={`feedback-text ${fb.sentiment === 'Positive' ? 'text-green' : fb.sentiment === 'Negative' ? 'text-red' : 'text-orange'}`}>
                                            {fb.feedback_text}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentPortal;
