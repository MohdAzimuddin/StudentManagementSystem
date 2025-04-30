// src/pages/tests/CompletedTests.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const CompletedTests = () => {
  const { user } = useAuth();
  const [completedTests, setCompletedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testDetails, setTestDetails] = useState({});

  useEffect(() => {
    const fetchCompletedTests = () => {
      try {
        setLoading(true);
        
        // Make sure user is logged in
        if (!user || !user.email) {
          console.log("No user is logged in");
          setCompletedTests([]);
          return;
        }
        
        // Get completed tests for this student
        const storedCompletedTests = localStorage.getItem('completedTests');
        if (!storedCompletedTests) {
          console.log("No completed tests found");
          setCompletedTests([]);
          setLoading(false);
          return;
        }
        
        try {
          const parsedCompletedTests = JSON.parse(storedCompletedTests);
          // Filter completed tests by student email
          const studentCompletedTests = parsedCompletedTests.filter(
            test => test.studentEmail === user.email
          );
          
          // Sort by submission date (most recent first)
          studentCompletedTests.sort((a, b) => 
            new Date(b.submittedAt) - new Date(a.submittedAt)
          );
          
          setCompletedTests(studentCompletedTests);
          console.log("Completed tests for this student:", studentCompletedTests);
          
          // Fetch detailed test information
          fetchTestDetails(studentCompletedTests.map(test => test.testId));
          
        } catch (e) {
          console.error("Error parsing completed tests:", e);
          setCompletedTests([]);
        }
        
      } catch (error) {
        console.error('Error loading completed tests:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch additional test details (subject, questions count, etc.)
    const fetchTestDetails = (testIds) => {
      try {
        const storedTests = localStorage.getItem('assignedTests');
        if (!storedTests) return;
        
        const allTests = JSON.parse(storedTests);
        const details = {};
        
        testIds.forEach(testId => {
          const test = allTests.find(t => t.id === testId);
          if (test) {
            details[testId] = {
              subject: test.subject,
              questionCount: test.questions.length,
              teacherName: test.teacherName,
              duration: test.duration
            };
          }
        });
        
        setTestDetails(details);
        
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    // Initial fetch
    if (user) {
      fetchCompletedTests();
    }
    
    // Listen for changes
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing completed tests");
      fetchCompletedTests();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assignedTestsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignedTestsUpdated', handleStorageChange);
    };
  }, [user]);

  // Render loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Completed Tests</h1>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Loading your completed tests...</p>
        </div>
      </div>
    );
  }

  // Helper function to determine the color based on percentage
  const getScoreColor = (percentage) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    if (percentage >= 50) return "text-orange-500";
    return "text-red-600";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Completed Tests</h1>
        <Link 
          to="/tests"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Available Tests
        </Link>
      </div>
      
      {completedTests.length > 0 ? (
        <div className="space-y-4">
          {completedTests.map((test, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-semibold">{test.testTitle}</h2>
                  {testDetails[test.testId] && (
                    <p className="text-gray-600">
                      Subject: {testDetails[test.testId].subject} | 
                      Questions: {testDetails[test.testId].questionCount} |
                      Teacher: {testDetails[test.testId].teacherName}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Completed on: {new Date(test.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-bold">
                      <span className={getScoreColor(test.percentage)}>
                        {test.percentage}%
                      </span>
                    </p>
                    <p className="text-gray-600">
                      ({test.score}/{test.totalPossible})
                    </p>
                  </div>
                  <div className="mt-1">
                    <Link
                      to={`/test-result/${test.testId}`}
                      className="inline-block bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    test.percentage >= 90 ? 'bg-emerald-500' : 
                    test.percentage >= 70 ? 'bg-green-500' : 
                    test.percentage >= 60 ? 'bg-yellow-500' : 
                    test.percentage >= 50 ? 'bg-orange-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${test.percentage}%` }}
                ></div>
              </div>
              
              {/* Performance badges */}
              <div className="mt-3 flex space-x-2">
                {test.percentage >= 90 && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">
                    Excellent
                  </span>
                )}
                {test.percentage >= 70 && test.percentage < 90 && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Good
                  </span>
                )}
                {test.percentage >= 50 && test.percentage < 70 && (
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                    Satisfactory
                  </span>
                )}
                {test.percentage < 50 && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                    Needs Improvement
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">You haven't completed any tests yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Tests you complete will appear here for reference.
          </p>
          <Link 
            to="/assigned-tests" 
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            View Available Tests
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompletedTests;