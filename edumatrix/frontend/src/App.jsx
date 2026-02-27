import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AiInsights from './pages/AiInsights';
import AnalyticsLab from './pages/AnalyticsLab';
import CareerIntelligence from './pages/CareerIntelligence';
import ParentPortal from './pages/ParentPortal';
import AdminControl from './pages/AdminControl';
import Gamification from './pages/Gamification';
import StudentDashboard from './pages/StudentDashboard';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Navigate to="/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="student-dashboard" element={<StudentDashboard />} />
                            <Route path="ai-insights" element={<AiInsights />} />
                            <Route path="career" element={<CareerIntelligence />} />
                            <Route path="analytics" element={<AnalyticsLab />} />
                            <Route path="parent" element={<ParentPortal />} />
                            <Route path="admin" element={<AdminControl />} />
                            <Route path="gamification" element={<Gamification />} />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
