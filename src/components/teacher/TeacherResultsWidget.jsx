// src/components/teacher/TeacherResultsWidget.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const TeacherResultsWidget = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestResults = () => {
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
        
        // Extract all student results
        const allResults = [];
        
        teacherTests.forEach(test => {
          if (test.results) {
            Object.entries(test.results).forEach(([studentEmail, resultData]) => {
              allResults.push({
                testId: test.id,
                testTitle: test.title,
                subject: test.subject,
                studentEmail: studentEmail,
                studentName: resultData.studentName || studentEmail,
                score: resultData.score,
                totalPossible: resultData.totalPossible,
                percentage: ((resultData.score / resultData.totalPossible) * 100).toFixed(1),
                submittedAt: resultData.submittedAt,
                hasUnread: test.notifications?.some(n => 
                  n.student === (resultData.studentName || studentEmail) && !n.read
                )
              });
            });
          }
        });
        
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
      fetchTestResults();
    }
    
    // Listen for storage changes
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing test results");
      fetchTestResults();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assignedTestsUpdated', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignedTestsUpdated', handleStorageChange);
    };
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Test Submissions</h2>
        <div className="text-center p-4">
          <p className="text-gray-500">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Test Submissions</h2>
        <div className="bg-red-50 text-red-600 p-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Test Submissions</h2>
      
      {testResults.length === 0 ? (
        <div className="text-center p-4 border rounded bg-gray-50">
          <p className="text-gray-500">No test submissions yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            When students complete tests, their results will appear here.
          </p>
          <Link 
            to="/teacher/assign-test" 
            className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Assign a Test
          </Link>
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
                  Submitted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testResults.slice(0, 10).map((result, index) => (
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
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(result.submittedAt).toLocaleString(undefined, {
                      dateStyle: 'short',
                      timeStyle: 'short'
                    })}
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
          
          {testResults.length > 10 && (
            <div className="text-center mt-4">
              <Link
                to="/teacher/view-results"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All {testResults.length} Results
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherResultsWidget;