// src/pages/tests/AssignedTests.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const AssignedTests = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedTests, setCompletedTests] = useState([]);

  useEffect(() => {
    // Function to fetch tests from localStorage
    const fetchTests = () => {
      try {
        setLoading(true);
        
        // Make sure we have a valid user
        if (!user || !user.email) {
          console.log("No user is logged in");
          setTests([]);
          return;
        }
        
        // Get completed tests for this student
        const storedCompletedTests = localStorage.getItem('completedTests');
        let completedTestIds = [];
        
        if (storedCompletedTests) {
          try {
            const parsedCompletedTests = JSON.parse(storedCompletedTests);
            // Filter completed tests by this student's email
            const studentCompletedTests = parsedCompletedTests.filter(
              test => test.studentEmail === user.email
            );
            completedTestIds = studentCompletedTests.map(test => test.testId);
            setCompletedTests(studentCompletedTests);
            console.log("Completed test IDs for this student:", completedTestIds);
          } catch (e) {
            console.error("Error parsing completed tests:", e);
          }
        }
        
        // Get data from localStorage
        const storedTests = localStorage.getItem('assignedTests');
        
        if (!storedTests) {
          console.log("No tests found in localStorage");
          setTests([]);
          return;
        }
        
        let allTests = [];
        try {
          allTests = JSON.parse(storedTests);
          console.log("All tests from localStorage:", allTests);
        } catch (e) {
          console.error("Error parsing tests from localStorage:", e);
          setTests([]);
          return;
        }
        
        // Filter tests:
        // 1. Only tests with future due dates
        // 2. Exclude tests that this student has already completed
        const availableTests = allTests.filter(test => {
          // Check if due date is in the future
          const dueDate = new Date(test.dueDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const dueDateValid = dueDate >= today;
          
          // Check if this student has already completed this test
          const notCompleted = !completedTestIds.includes(test.id);
          
          // Only show tests that are due in the future AND not completed by this student
          return dueDateValid && notCompleted;
        });
        
        console.log("Available tests after filtering:", availableTests);
        setTests(availableTests);
        
      } catch (error) {
        console.error('Error loading tests:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    if (user) {
      fetchTests();
    }
    
    // Set up event listeners for updates
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing tests");
      fetchTests();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assignedTestsUpdated', handleStorageChange);
    
    // Manual polling as a fallback (every 5 seconds)
    const interval = setInterval(fetchTests, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignedTestsUpdated', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  // Force manual refresh
  const refreshTests = () => {
    setLoading(true);
    
    // Small delay to make the loading state visible
    setTimeout(() => {
      const storedTests = localStorage.getItem('assignedTests');
      console.log("Raw tests from localStorage:", storedTests);
      
      if (storedTests) {
        try {
          const allTests = JSON.parse(storedTests);
          
          // Get completed tests for filtering
          const storedCompletedTests = localStorage.getItem('completedTests');
          let completedTestIds = [];
          
          if (storedCompletedTests && user) {
            const parsedCompletedTests = JSON.parse(storedCompletedTests);
            const studentCompletedTests = parsedCompletedTests.filter(
              test => test.studentEmail === user.email
            );
            completedTestIds = studentCompletedTests.map(test => test.testId);
          }
          
          const availableTests = allTests.filter(test => {
            const dueDate = new Date(test.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Only show tests that are due in the future AND not completed by this student
            return dueDate >= today && !completedTestIds.includes(test.id);
          });
          
          setTests(availableTests);
        } catch (e) {
          console.error("Error parsing:", e);
        }
      }
      setLoading(false);
    }, 300);
  };

  // Function to check for unanswered questions before submission
  const handleTakeTest = (testId) => {
    // Store a flag in localStorage that will be checked when submitting the test
    localStorage.setItem('checkUnansweredQuestions', 'true');
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Assigned Tests</h1>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Loading your assigned tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assigned Tests</h1>
        <button 
          onClick={refreshTests}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh Tests
        </button>
      </div>
      
      {/* Display completed tests count */}
      {completedTests.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="font-medium text-green-700">
            You have completed {completedTests.length} test{completedTests.length !== 1 ? 's' : ''}.
          </p>
          <Link 
            to="/completed-tests"
            className="text-sm text-green-600 hover:underline"
          >
            <button   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-auto">
            View your completed tests
            </button>
          </Link>
        </div>
      )}
      
      {/* Debug section - remove in production */}
      <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold">Debug Info:</h3>
        <p>Logged in user: {user?.email} (Role: {user?.role})</p>
        <p>Available tests: {tests.length}</p>
        <p>Completed tests: {completedTests.length}</p>
      </div>
      
      <div className="space-y-4">
        {tests.length > 0 ? (
          tests.map(test => (
            <div key={test.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{test.title}</h2>
                  <p className="text-gray-600 mt-2">
                    Subject: {test.subject} | Due: {new Date(test.dueDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Total Marks: {test.totalMarks}</p>
                  <p className="text-gray-600">Duration: {test.duration} minutes</p>
                  <p className="text-gray-600">Teacher: {test.teacherName}</p>
                </div>
                <Link
                  to={`/take-test/${test.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleTakeTest(test.id)}
                >
                  Take Test
                </Link>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-2">Test Overview: {test.questions.length} Questions</h3>
                <p className="text-sm text-gray-500">
                  This test contains {test.questions.length} questions from {test.subject}.
                  Click "Take Test" to begin. Make sure you have {test.duration} minutes available before starting.
                </p>
                <p className="text-sm text-gray-500 mt-2 italic">
                  Note: You will be notified if you leave any questions unanswered before submission.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">No assigned tests available at the moment.</p>
            <p className="text-sm text-gray-400 mt-2">When your teacher assigns tests, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTests;