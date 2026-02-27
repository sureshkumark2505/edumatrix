const express = require('express');
const router = express.Router();

// Mock Data for Dashboard API
router.get('/dashboard/stats', (req, res) => {
    res.json({
        totalStudents: 12450,
        averageGPA: 3.42,
        riskStudents: 412,
        attendanceRate: 91.5,
        growthPercentage: 4.2
    });
});

// Mock Data for AI Insights API
router.get('/ai/insights', (req, res) => {
    res.json({
        predictedGPA: 3.6,
        dropoutRiskScore: 12, // percentage
        stabilityMeter: 85, // percentage
        recommendations: [
            "Increase study hours in Advanced Calculus",
            "Attend upcoming Data Structures workshop",
            "Maintain current attendance streak"
        ]
    });
});

module.exports = router;
