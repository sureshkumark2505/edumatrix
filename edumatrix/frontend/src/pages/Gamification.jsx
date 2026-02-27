import React, { useState, useEffect } from 'react';
import { Trophy, Fire, Star, Medal, ArrowUp } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
import { getStudentProfile, getTopStudents } from '../services/dataService';
import './Gamification.css';

const Gamification = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGameData = async () => {
            if (user?.role === 'student' && user?.studentId) {
                const prof = await getStudentProfile(user.studentId);
                setProfile(prof);
            }
            const tops = await getTopStudents(5);
            setLeaderboard(tops);
            setLoading(false);
        };
        loadGameData();
    }, [user]);

    const badges = [
        { name: "Perfect Attendance", desc: "100% attendance this month", icon: <Star weight="fill" />, color: "var(--c-teal)", earned: true },
        { name: "Top 5% Calculus", desc: "Scored in top 5% on Midterm", icon: <Medal weight="fill" />, color: "var(--c-indigo)", earned: true },
        { name: "Early Bird", desc: "Submitted 5 assignments early", icon: <Fire weight="fill" />, color: "var(--c-orange)", earned: false }
    ];

    if (loading) {
        return <div className="gamification-container"><h2 className="text-secondary">Loading Game Stats...</h2></div>;
    }

    return (
        <div className="gamification-container">
            <div className="page-header">
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trophy size={28} weight="fill" color="var(--c-orange)" />
                        Student Motivation
                    </h1>
                    <p className="text-tertiary">Gamified learning paths and academic achievements.</p>
                </div>
            </div>

            {/* Top Stats */}
            {profile && (
                <div className="game-stats-grid">
                    <div className="game-stat-card glass-panel badge-glow">
                        <div className="icon-wrapper bg-orange">
                            <Fire size={28} weight="fill" color="var(--c-orange)" />
                        </div>
                        <div>
                            <h4>Study Streak</h4>
                            <h2>{profile.study_streak_days} Days</h2>
                            <p className="text-tertiary">Keep it up!</p>
                        </div>
                    </div>

                    <div className="game-stat-card glass-panel badge-glow">
                        <div className="icon-wrapper bg-indigo">
                            <ArrowUp size={28} weight="bold" color="var(--c-indigo)" />
                        </div>
                        <div>
                            <h4>Total XP</h4>
                            <h2>{profile.total_xp} XP</h2>
                            <div className="xp-bar mt-2">
                                <div className="xp-fill bg-indigo" style={{ width: `${(profile.total_xp % 1000) / 10}%` }}></div>
                            </div>
                            <p className="text-tertiary mt-2">{(1000 - (profile.total_xp % 1000))} XP to next tier</p>
                        </div>
                    </div>

                    <div className="game-stat-card glass-panel badge-glow">
                        <div className="icon-wrapper bg-teal">
                            <Trophy size={28} weight="fill" color="var(--c-teal)" />
                        </div>
                        <div>
                            <h4>Global Rank</h4>
                            <h2>#{profile.global_rank}</h2>
                            <p className="text-green font-bold">↑ Top 12% among Sophomores</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="game-layout">
                {/* Badges Column */}
                <div className="badges-column">
                    <div className="glass-panel p-24">
                        <div className="card-header">
                            <h3>Achievement Badges</h3>
                        </div>
                        <div className="badges-grid">
                            {badges.map((badge, idx) => (
                                <div className={`badge-card ${!badge.earned ? 'locked' : ''}`} key={idx}>
                                    <div className="badge-icon" style={{ backgroundColor: `${badge.color}20`, color: badge.color }}>
                                        {badge.icon}
                                    </div>
                                    <h4>{badge.name}</h4>
                                    <p>{badge.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Leaderboard Column */}
                <div className="leaderboard-column">
                    <div className="glass-panel p-24 h-full">
                        <div className="card-header">
                            <h3>Global Leaderboard</h3>
                        </div>
                        <div className="leaderboard-list">
                            {leaderboard.map((lbUser, idx) => {
                                const isCurrentUser = profile ? lbUser.student_id === profile.student_id : false;
                                return (
                                    <div className={`lb-item ${isCurrentUser ? 'lb-active' : ''}`} key={idx}>
                                        <div className="lb-rank">
                                            {idx === 0 ? <Medal color="#F59E0B" weight="fill" size={24} /> :
                                                idx === 1 ? <Medal color="#9CA3AF" weight="fill" size={24} /> :
                                                    idx === 2 ? <Medal color="#B45309" weight="fill" size={24} /> :
                                                        <span>#{lbUser.rank}</span>}
                                        </div>
                                        <div className="lb-name">{lbUser.name} {isCurrentUser && '(You)'}</div>
                                        <div className="lb-score">{lbUser.score} XP</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gamification;
