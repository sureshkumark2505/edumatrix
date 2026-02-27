const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to write CSV
function writeCSV(filename, headers, rows) {
    const filePath = path.join(DATA_DIR, filename);
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    fs.writeFileSync(filePath, csvContent, 'utf8');
    console.log(`Created ${filename}`);
}

// 1. students.csv
const studentHeaders = ['student_id', 'first_name', 'last_name', 'email', 'department', 'year_of_study', 'current_cgpa', 'total_xp', 'global_rank', 'academic_status', 'dropout_risk_score', 'study_streak_days'];
const studentRows = [
    ['CMD-00101', 'Emma', 'Wright', 'e.wright@edumatrix.ai', 'Computer Science', 2, 9.85, 2840, 1, 'Stable', 2, 21],
    ['CMD-00102', 'James', 'Cole', 'j.cole@edumatrix.ai', 'Engineering', 3, 9.20, 2710, 2, 'Stable', 5, 14],
    ['CMD-00103', 'Sophia', 'Lee', 's.lee@edumatrix.ai', 'Business', 1, 8.75, 2500, 4, 'Stable', 8, 10],
    ['CMD-00104', 'Lucas', 'Brown', 'l.brown@edumatrix.ai', 'Arts', 4, 7.80, 2420, 5, 'Stable', 15, 7],
    ['CMD-00105', 'Olivia', 'Davis', 'o.davis@edumatrix.ai', 'Science', 2, 7.15, 1800, 1200, 'At-Risk', 45, 2],
    ['CMD-00106', 'Liam', 'Miller', 'l.miller@edumatrix.ai', 'Computer Science', 3, 9.50, 2600, 3, 'Stable', 4, 18],
    ['CMD-00107', 'Ava', 'Wilson', 'a.wilson@edumatrix.ai', 'Engineering', 1, 8.40, 2100, 300, 'Stable', 10, 5],
    ['CMD-00108', 'Noah', 'Moore', 'n.moore@edumatrix.ai', 'Business', 2, 7.95, 1950, 800, 'Stable', 20, 4],
    ['CMD-00109', 'Isabella', 'Taylor', 'i.taylor@edumatrix.ai', 'Arts', 3, 8.90, 2300, 150, 'Stable', 6, 12],
    ['CMD-00110', 'Mason', 'Anderson', 'm.anderson@edumatrix.ai', 'Science', 4, 7.05, 1750, 1500, 'At-Risk', 50, 1],
];
writeCSV('students.csv', studentHeaders, studentRows);

// 2. courses.csv
const courseHeaders = ['course_id', 'course_name', 'department', 'credits'];
const courseRows = [
    ['CS101', 'Data Structures', 'Computer Science', 4],
    ['ENG201', 'Thermodynamics', 'Engineering', 3],
    ['BUS105', 'Microeconomics', 'Business', 3],
    ['ART301', 'Modernist Poetry', 'Arts', 3],
    ['SCI102', 'Organic Chemistry', 'Science', 4],
    ['CS202', 'Machine Learning', 'Computer Science', 4],
    ['ENG305', 'Fluid Mechanics', 'Engineering', 4],
    ['BUS401', 'Strategic Management', 'Business', 3],
];
writeCSV('courses.csv', courseHeaders, courseRows);

// 3. enrollments.csv
const enrollHeaders = ['enrollment_id', 'student_id', 'course_id', 'semester', 'grade', 'score_percentage', 'competency_level', 'target_goal'];
const enrollRows = [
    ['ENR-001', 'CMD-00101', 'CS101', 'Fall 2025', 'A+', 98, 95, 90],
    ['ENR-002', 'CMD-00101', 'CS202', 'Fall 2025', 'A', 92, 90, 95],
    ['ENR-003', 'CMD-00102', 'ENG201', 'Fall 2025', 'A', 90, 88, 85],
    ['ENR-004', 'CMD-00105', 'SCI102', 'Fall 2025', 'C', 72, 65, 80],
    ['ENR-005', 'CMD-00106', 'CS202', 'Fall 2025', 'A', 94, 92, 95],
    ['ENR-006', 'CMD-00110', 'SCI102', 'Fall 2025', 'C-', 70, 60, 75],
];
writeCSV('enrollments.csv', enrollHeaders, enrollRows);

// 4. semester_performance.csv
const perfHeaders = ['performance_id', 'student_id', 'semester_number', 'gpa', 'is_predicted'];
const perfRows = [
    ['PERF-01', 'CMD-00101', 1, 9.70, 'FALSE'],
    ['PERF-02', 'CMD-00101', 2, 9.85, 'FALSE'],
    ['PERF-03', 'CMD-00101', 3, 9.90, 'TRUE'],
    ['PERF-04', 'CMD-00105', 1, 7.50, 'FALSE'],
    ['PERF-05', 'CMD-00105', 2, 7.15, 'FALSE'],
    ['PERF-06', 'CMD-00105', 3, 6.80, 'TRUE'],
];
writeCSV('semester_performance.csv', perfHeaders, perfRows);

// 5. attendance.csv
const attHeaders = ['attendance_id', 'student_id', 'course_id', 'date', 'status'];
const attRows = [
    ['ATT-01', 'CMD-00101', 'CS101', '2026-02-10', 'Present'],
    ['ATT-02', 'CMD-00101', 'CS202', '2026-02-10', 'Present'],
    ['ATT-03', 'CMD-00105', 'SCI102', '2026-02-10', 'Absent'],
    ['ATT-04', 'CMD-00110', 'SCI102', '2026-02-10', 'Absent'],
];
writeCSV('attendance.csv', attHeaders, attRows);

// 6. teacher_feedbacks.csv
const fbHeaders = ['feedback_id', 'student_id', 'course_id', 'teacher_name', 'feedback_text', 'date_posted', 'sentiment'];
const fbRows = [
    ['FB-01', 'CMD-00101', 'CS101', 'Dr. Alan Turing', 'Emma shows exceptional understanding of tree algorithms.', '2026-02-15', 'Positive'],
    ['FB-02', 'CMD-00105', 'SCI102', 'Prof. Marie Curie', 'Olivia needs to focus more during lab sessions.', '2026-02-16', 'Negative'],
    ['FB-03', 'CMD-00106', 'CS202', 'Dr. Andrew Ng', 'Liams final project on neural networks was outstanding.', '2026-02-18', 'Positive'],
];
writeCSV('teacher_feedbacks.csv', fbHeaders, fbRows);

// 7. careers.csv
const carHeaders = ['career_id', 'title', 'trend'];
const carRows = [
    ['CAR-01', 'Machine Learning Engineer', 'hot'],
    ['CAR-02', 'Data Scientist', 'stable'],
    ['CAR-03', 'Civil Engineer', 'stable'],
    ['CAR-04', 'Investment Banker', 'hot'],
];
writeCSV('careers.csv', carHeaders, carRows);

// 8. student_career_matches.csv
const scmHeaders = ['match_id', 'student_id', 'career_id', 'match_percentage', 'missing_skill'];
const scmRows = [
    ['MAT-01', 'CMD-00101', 'CAR-01', 98, 'Advanced NLP'],
    ['MAT-02', 'CMD-00102', 'CAR-03', 85, 'Structural Analysis Software'],
    ['MAT-03', 'CMD-00106', 'CAR-02', 92, 'Big Data Technologies'],
];
writeCSV('student_career_matches.csv', scmHeaders, scmRows);

// 9. certifications.csv
const certHeaders = ['cert_id', 'name', 'platform', 'duration'];
const certRows = [
    ['CERT-01', 'AWS Certified Machine Learning', 'Coursera', '3 Weeks'],
    ['CERT-02', 'Financial Modeling Certification', 'Udemy', '4 Weeks'],
];
writeCSV('certifications.csv', certHeaders, certRows);

// 10. internships.csv
const intHeaders = ['internship_id', 'role', 'company', 'term'];
const intRows = [
    ['INT-01', 'Google ML Research Intern', 'Google', 'Summer 2026'],
    ['INT-02', 'Goldman Sachs Analyst Summer Intern', 'Goldman Sachs', 'Summer 2026'],
];
writeCSV('internships.csv', intHeaders, intRows);

// 11. badges.csv
const badgeHeaders = ['badge_id', 'name', 'description', 'theme_color'];
const badgeRows = [
    ['BDG-01', 'Perfect Attendance', '100% attendance this month', 'teal'],
    ['BDG-02', 'Top 5% Achiever', 'Scored in top 5% on Midterm', 'indigo'],
    ['BDG-03', 'Early Bird', 'Submitted 5 assignments early', 'orange'],
];
writeCSV('badges.csv', badgeHeaders, badgeRows);

// 12. student_badges.csv
const sbHeaders = ['earned_id', 'student_id', 'badge_id', 'date_earned'];
const sbRows = [
    ['SBDG-01', 'CMD-00101', 'BDG-01', '2026-01-31'],
    ['SBDG-02', 'CMD-00101', 'BDG-02', '2026-02-15'],
    ['SBDG-03', 'CMD-00106', 'BDG-03', '2026-02-10'],
    ['SBDG-04', 'CMD-00102', 'BDG-01', '2026-01-31'],
];
writeCSV('student_badges.csv', sbHeaders, sbRows);

// 13. login_credentials.csv
const credHeaders = ['email', 'password', 'role', 'student_id'];
const credRows = [
    // Staff & Admins
    ['admin@edumatrix.ai', 'admin123', 'admin', ''],
    ['staff@edumatrix.ai', 'staff123', 'staff', ''],
    // Parents
    ['parent_emma@edumatrix.ai', 'parent123', 'parent', 'CMD-00101'],
    ['parent_james@edumatrix.ai', 'parent123', 'parent', 'CMD-00102'],
    ['parent_olivia@edumatrix.ai', 'parent123', 'parent', 'CMD-00105'],
    // Students corresponding to the 10 real data records
    ['e.wright@edumatrix.ai', 'student123', 'student', 'CMD-00101'],
    ['j.cole@edumatrix.ai', 'student123', 'student', 'CMD-00102'],
    ['s.lee@edumatrix.ai', 'student123', 'student', 'CMD-00103'],
    ['l.brown@edumatrix.ai', 'student123', 'student', 'CMD-00104'],
    ['o.davis@edumatrix.ai', 'student123', 'student', 'CMD-00105'],
    ['l.miller@edumatrix.ai', 'student123', 'student', 'CMD-00106'],
    ['a.wilson@edumatrix.ai', 'student123', 'student', 'CMD-00107'],
    ['n.moore@edumatrix.ai', 'student123', 'student', 'CMD-00108'],
    ['i.taylor@edumatrix.ai', 'student123', 'student', 'CMD-00109'],
    ['m.anderson@edumatrix.ai', 'student123', 'student', 'CMD-00110'],
];
writeCSV('login_credentials.csv', credHeaders, credRows);

console.log('All CSV data generation complete!');
