// Helper function to fetch and parse uniformly quoted CSV files
export const fetchCSV = async (filename) => {
    try {
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) throw new Error(`Failed to fetch ${filename}`);

        const text = await response.text();
        const lines = text.trim().split('\n');

        // Extract headers
        const headers = lines[0].split(',').map(h => h.replace(/^"(.*)"$/, '$1').trim());

        // Extract data rows
        const data = lines.slice(1).map(line => {
            // Split by comma, but handle quoted strings correctly
            const values = line.split('","').map(v => v.replace(/(^"|"$)/g, ''));
            const entry = {};
            headers.forEach((header, index) => {
                entry[header] = values[index] !== undefined ? values[index] : '';
            });
            return entry;
        });

        return data;
    } catch (error) {
        console.error("Data Fetch Error:", error);
        return [];
    }
};

// ============================================
// Data Access Layer API
// ============================================

// 1. Get Student Profile
export const getStudentProfile = async (studentId) => {
    const students = await fetchCSV('students.csv');
    return students.find(s => s.student_id === studentId) || null;
};

// 2. Get Student Enrollments with Course Details
export const getStudentEnrollments = async (studentId) => {
    const enrollments = await fetchCSV('enrollments.csv');
    const courses = await fetchCSV('courses.csv');

    const studentEnrollments = enrollments.filter(e => e.student_id === studentId);

    // Join with course data
    return studentEnrollments.map(enr => {
        const courseDetails = courses.find(c => c.course_id === enr.course_id) || {};
        return { ...enr, ...courseDetails };
    });
};

// 3. Get Student Performance Trend (AI Predictor Data)
export const getStudentPerformance = async (studentId) => {
    const performance = await fetchCSV('semester_performance.csv');
    // Sort by semester number to ensure correct time-series
    return performance
        .filter(p => p.student_id === studentId)
        .sort((a, b) => parseInt(a.semester_number) - parseInt(b.semester_number));
};

// 4. Get Student Teacher Feedback
export const getStudentFeedback = async (studentId) => {
    const feedbacks = await fetchCSV('teacher_feedbacks.csv');
    const courses = await fetchCSV('courses.csv');

    const myFeedback = feedbacks.filter(f => f.student_id === studentId);

    return myFeedback.map(fb => {
        const course = courses.find(c => c.course_id === fb.course_id);
        return { ...fb, course_name: course ? course.course_name : fb.course_id };
    });
};

// 5. Get Student AI Career Matches
export const getStudentCareerMatches = async (studentId) => {
    const matches = await fetchCSV('student_career_matches.csv');
    const careers = await fetchCSV('careers.csv');

    const myMatches = matches.filter(m => m.student_id === studentId);

    return myMatches.map(match => {
        const career = careers.find(c => c.career_id === match.career_id);
        return { ...match, ...career };
    }).sort((a, b) => parseInt(b.match_percentage) - parseInt(a.match_percentage));
};

// 6. Get Global Dashboard Stats (Admin/Staff view)
export const getGlobalStats = async () => {
    const students = await fetchCSV('students.csv');

    const totalStudents = students.length;
    const avgGpa = students.reduce((acc, curr) => acc + parseFloat(curr.current_cgpa), 0) / totalStudents;
    const atRisk = students.filter(s => s.academic_status === 'At-Risk').length;

    return {
        totalStudents,
        averageGpa: avgGpa.toFixed(2),
        atRiskStudents: atRisk
    };
};

// 7. Get Top Students (for Leaderboard)
export const getTopStudents = async (limit = 10) => {
    const students = await fetchCSV('students.csv');
    
    // Sort by global_rank (ascending - lower rank number is better)
    return students
        .sort((a, b) => parseInt(a.global_rank) - parseInt(b.global_rank))
        .slice(0, limit);
};
