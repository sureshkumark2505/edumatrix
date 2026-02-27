import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, EnvelopeSimple, LockKey, ArrowRight } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login: authenticateUser } = useAuth();
    const [role, setRole] = useState('admin');

    const getRoleCredentials = () => {
        switch (role) {
            case 'admin': return { email: 'admin@edumatrix.ai', pass: 'admin123' };
            case 'staff': return { email: 'staff@edumatrix.ai', pass: 'staff123' };
            case 'student': return { email: 'e.wright@edumatrix.ai', pass: 'student123' };
            case 'parent': return { email: 'parent_emma@edumatrix.ai', pass: 'parent123' };
            default: return { email: '', pass: '' };
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Pass the role and current credential information to the global AuthContext
        const currentCreds = getRoleCredentials();
        authenticateUser(role, currentCreds.email, role === 'student' ? 'CMD-00101' : null);

        if (role === 'student' || role === 'parent') {
            navigate('/student-dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    const credentials = getRoleCredentials();

    return (
        <div className="login-container">
            <div className="login-visual-panel">
                <div className="visual-content">
                    <div className="logo-box-large">E²</div>
                    <h1 className="text-gradient">EduMatrix AI</h1>
                    <p>The intelligence layer for modern education.</p>

                    <div className="abstract-graphics">
                        {/* CSS shapes */}
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3 glass-panel">
                            <ShieldCheck size={32} color="var(--c-primary)" weight="duotone" />
                            <span>Enterprise Grade Security</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-form-panel">
                <div className="login-card glass-panel">
                    <h2>Welcome back</h2>
                    <p className="subtitle">Please enter your details to sign in.</p>

                    <div className="role-selector">
                        {['admin', 'staff', 'student', 'parent'].map(r => (
                            <button
                                key={r}
                                className={`role-btn ${role === r ? 'active' : ''}`}
                                onClick={() => setRole(r)}
                                type="button"
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <EnvelopeSimple size={20} className="input-icon" />
                                <input key={`email-${role}`} type="email" placeholder="Enter your email" required defaultValue={credentials.email} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <LockKey size={20} className="input-icon" />
                                <input key={`pass-${role}`} type="password" placeholder="••••••••" required defaultValue={credentials.pass} />
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-container">
                                <input type="checkbox" defaultChecked />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-primary login-btn">
                            Sign In
                            <ArrowRight size={20} weight="bold" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
