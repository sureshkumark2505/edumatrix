import React, { useState, useEffect } from 'react';
import { Briefcase, Medal, ArrowRight, BookOpen } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
import { getStudentCareerMatches } from '../services/dataService';
import './CareerIntelligence.css';

const CareerIntelligence = () => {
    const { user } = useAuth();
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCareers = async () => {
            if (user?.role === 'student' && user?.studentId) {
                const matches = await getStudentCareerMatches(user.studentId);
                setCareers(matches.slice(0, 4)); // top 4
            }
            setLoading(false);
        };
        loadCareers();
    }, [user]);

    const recommendedCerts = [
        { name: "AWS Certified Machine Learning", platform: "Coursera", time: "3 Weeks", icon: <Briefcase /> },
        { name: "Advanced SQL Data Modeling", platform: "edX", time: "2 Weeks", icon: <BookOpen /> }
    ];

    if (loading) {
        return <div className="career-container"><h2 className="text-secondary">Loading Career Models...</h2></div>;
    }

    return (
        <div className="career-container">
            <div className="page-header">
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Briefcase size={28} weight="fill" color="var(--c-indigo)" />
                        Career Intelligence
                    </h1>
                    <p className="text-tertiary">Algorithmically matched career paths based on academic performance.</p>
                </div>
            </div>

            <div className="career-layout">
                {/* Left Column */}
                <div className="match-engine">
                    <div className="engine-card glass-panel">
                        <div className="card-header">
                            <h3>Career Match Percentage</h3>
                            <span className="badge-primary">Industry Readiness: 84%</span>
                        </div>

                        <div className="career-list">
                            {careers.map((career, idx) => (
                                <div className="career-item" key={idx}>
                                    <div className="career-info">
                                        <h4>{career.title} {career.trend === 'hot' && <span className="hot-tag">🔥 Trending</span>}</h4>
                                        <div className="actionable-insight">
                                            <span className="skill-gap text-red">Gap: {career.missing_skill}</span>
                                        </div>
                                    </div>

                                    <div className="match-bar-container">
                                        <div className="match-score">
                                            {career.match_percentage}% Match
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${career.match_percentage}%`,
                                                    background: career.match_percentage > 85 ? 'var(--grad-teal-blue)' : 'var(--grad-indigo-blue)'
                                                }}>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="icon-btn-small"><ArrowRight size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="side-recommendations">

                    <div className="cert-panel glass-panel">
                        <div className="panel-header">
                            <h3><Medal size={20} className="text-primary" /> Recommended Certifications</h3>
                        </div>
                        <div className="cert-list">
                            {recommendedCerts.map((cert, idx) => (
                                <div className="cert-item" key={idx}>
                                    <div className="cert-icon">{cert.icon}</div>
                                    <div className="cert-details">
                                        <h5>{cert.name}</h5>
                                        <p>{cert.platform} • {cert.time}</p>
                                    </div>
                                    <button className="btn-secondary-small">Enroll</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="internship-panel glass-panel mt-4">
                        <div className="panel-header">
                            <h3>Top Internship Match</h3>
                        </div>
                        <div className="intern-box">
                            <div className="company-logo">G</div>
                            <div className="intern-details">
                                <h5>Google ML Research Intern</h5>
                                <p>Summer 2026 • Mountain View</p>
                                <span className="text-green font-bold">92% Probability Profile Match</span>
                            </div>
                        </div>
                        <button className="btn-primary full-width mt-4">Apply Now</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CareerIntelligence;
