// src/pages/teacher/TeacherViewResults.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const TeacherViewResults = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    test: '',
    student: '',
    status: ''
  });
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchAllResults = () => {
      try {
        setLoading(true);
        
        // Make sure we have a valid teacher user
        if (!user || user.role !== 'teacher') {
          console.log("No teacher user is logged in");
          setTestResults([]);
          return;
        }
        
        // Get data from localStorage
        const storedTests = localStorage.getItem('assignedTests');
        
        if (!storedTests) {
          console.log("No tests found in localStorage");
          setTestResults([]);
          return;
        }
        
        let allTests = [];
        try {
          allTests = JSON.parse(storedTests);
        } catch (e) {
          console.error("Error parsing tests from localStorage:", e);
          setTestResults([]);
          return;
        }
        
        // Filter tests created by this teacher
        const teacherTests = allTests.filter(test => 
          test.createdBy === user.email || test.teacherName === user.name
        );
        
        // Set available tests for filter
        setTests(teacherTests.map(test => ({
          id: test.id,
          title: test.title
        })));
        
        // Extract all student results
        const allResults = [];
        const uniqueStudents = new Set();
        
        teacherTests.forEach(test => {
          if (test.results) {
            Object.entries(test.results).forEach(([studentEmail, resultData]) => {
              const studentName = resultData.studentName || studentEmail;
              uniqueStudents.add(studentName);
              
              // Calculate pass/fail status
              const percentage = (resultData.score / resultData.totalPossible) * 100;
              const status = percentage >= 60 ? 'pass' : 'fail';
              
              allResults.push({
                testId: test.id,
                testTitle: test.title,
                subject: test.subject,
                studentEmail: studentEmail,
                studentName: studentName,
                score: resultData.score,
                totalPossible: resultData.totalPossible,
                percentage: percentage.toFixed(1),
                status: status,
                submittedAt: resultData.submittedAt,
                teacherFeedback: resultData.teacherFeedback || '',
                hasUnread: test.notifications?.some(n => 
                  n.student === studentName && !n.read
                )
              });
            });
          }
        });
        
        // Set unique students for filter
        setStudents(Array.from(uniqueStudents));
        
        // Sort by submission date (most recent first)
        allResults.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        
        setTestResults(allResults);
        
      } catch (error) {
        console.error('Error loading test results:', error);
        setError('Failed to load test results');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    if (user) {
      fetchAllResults();
    }
    
    // Listen for changes
    const handleStorageChange = () => {
      
      console.log("Storage changed, refreshing results");
      fetchAllResults();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assignedTestsUpdated', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignedTestsUpdated', handleStorageChange);
    };
  }, [user]);

  // Filter the results based on selected filters
  const filteredResults = testResults.filter(result => {
    return (
      (filter.test === '' || result.testId === filter.test) &&
      (filter.student === '' || result.studentName === filter.student) &&
      (filter.status === '' || result.status === filter.status)
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Test Results</h1>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Test Results</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="bg-red-50 p-4 rounded-lg text-red-600">
            <p>{error}</p>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/teacher/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Test Results</h1>
        <Link
          to="/teacher/dashboard"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to Dashboard
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="test-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Test
            </label>
            <select
              id="test-filter"
              className="w-full p-2 border rounded-md"
              value={filter.test}
              onChange={(e) => setFilter({ ...filter, test: e.target.value })}
            >
              <option value="">All Tests</option>
              {tests.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="student-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Student
            </label>
            <select
              id="student-filter"
              className="w-full p-2 border rounded-md"
              value={filter.student}
              onChange={(e) => setFilter({ ...filter, student: e.target.value })}
            >
              <option value="">All Students</option>
              {students.map((student) => (
                <option key={student} value={student}>
                  {student}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              id="status-filter"
              className="w-full p-2 border rounded-md"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button
            onClick={() => setFilter({ test: '', student: '', status: '' })}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Results Table */}
      <div className="bg-white rounded-lg shadow">
        {filteredResults.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No results match your filters.</p>
            {testResults.length > 0 && (
              <button
                onClick={() => setFilter({ test: '', student: '', status: '' })}
                className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters to see all results
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResults.map((result, index) => (
                  <tr key={index} className={result.hasUnread ? "bg-blue-50" : ""}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {result.hasUnread && (
                          <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {result.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {result.studentEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {result.testTitle}
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.subject}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        parseFloat(result.percentage) >= 60 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {result.percentage}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.score}/{result.totalPossible}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        result.status === 'pass'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {result.status === 'pass' ? 'Pass' : 'Fail'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(result.submittedAt).toLocaleString(undefined, {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {result.teacherFeedback ? (
                        <span className="text-green-600">Provided</span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <Link
                        to={`/teacher/view-result/${result.testId}/${encodeURIComponent(result.studentName)}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Result Stats */}
        {filteredResults.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredResults.length} of {testResults.length} results
              </div>
              
              <div className="flex space-x-4">
                <div className="text-sm">
                  <span className="font-medium">Pass Rate: </span>
                  <span className="text-green-600">
                    {Math.round((filteredResults.filter(r => r.status === 'pass').length / filteredResults.length) * 100)}%
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Avg Score: </span>
                  <span>
                    {(filteredResults.reduce((acc, curr) => acc + parseFloat(curr.percentage), 0) / filteredResults.length).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherViewResults; 


















