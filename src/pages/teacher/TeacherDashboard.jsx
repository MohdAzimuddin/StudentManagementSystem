// src/pages/teacher/TeacherDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import TeacherResultsWidget from '../../components/teacher/TeacherResultsWidget';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTests: 0,
    activeTests: 0,
    submissions: 0,
    averageScore: 0,
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = () => {
      try {
        setLoading(true);
        
        // Make sure we have a valid teacher user
        if (!user || user.role !== 'teacher') {
          console.log("No teacher user is logged in");
          return;
        }
        
        // Get data from localStorage
        const storedTests = localStorage.getItem('assignedTests');
        
        if (!storedTests) {
          console.log("No tests found in localStorage");
          return;
        }
        
        let allTests = [];
        try {
          allTests = JSON.parse(storedTests);
        } catch (e) {
          console.error("Error parsing tests from localStorage:", e);
          return;
        }
        
        // Filter tests created by this teacher
        const teacherTests = allTests.filter(test => 
          test.createdBy === user.email || test.teacherName === user.name
        );
        
        // Calculate stats
        const now = new Date();
        const activeTests = teacherTests.filter(test => new Date(test.dueDate) >= now);
        
        let totalSubmissions = 0;
        let totalScores = 0;
        let totalScoreCount = 0;
        
        // Collect notifications and count submissions
        const allNotifications = [];
        
        teacherTests.forEach(test => {
          // Count submissions
          if (test.results) {
            const submissionCount = Object.keys(test.results).length;
            totalSubmissions += submissionCount;
            
            // Calculate scores for average
            Object.values(test.results).forEach(result => {
              if (result.score !== undefined && result.totalPossible) {
                totalScores += (result.score / result.totalPossible) * 100;
                totalScoreCount++;
              }
            });
          }
          
          // Collect notifications
          if (test.notifications) {
            test.notifications.forEach(notification => {
              allNotifications.push({
                ...notification,
                testId: test.id,
                testTitle: test.title
              });
            });
          }
        });
        
        // Calculate average score
        const avgScore = totalScoreCount > 0 ? (totalScores / totalScoreCount).toFixed(1) : 0;
        
        // Update stats
        setStats({
          totalTests: teacherTests.length,
          activeTests: activeTests.length,
          submissions: totalSubmissions,
          averageScore: avgScore
        });
        
        // Sort notifications by date (most recent first) and limit to most recent
        allNotifications.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        setNotifications(allNotifications.slice(0, 10));
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    if (user) {
      fetchDashboardData();
    }
    
    // Listen for changes
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing dashboard");
      fetchDashboardData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assignedTestsUpdated', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignedTestsUpdated', handleStorageChange);
    };
  }, [user]);

  // Mark notification as read
  const markNotificationAsRead = (testId, notificationIndex) => {
    try {
      const storedTests = localStorage.getItem('assignedTests');
      if (!storedTests) return;
      
      const tests = JSON.parse(storedTests);
      const testIndex = tests.findIndex(t => t.id === testId);
      
      if (testIndex === -1) return;
      
      const test = tests[testIndex];
      if (!test.notifications) return;
      
      const studentName = notifications[notificationIndex].student;
      
      const testNotificationIndex = test.notifications.findIndex(
        n => n.student === studentName && !n.read
      );
      
      if (testNotificationIndex === -1) return;
      
      // Mark as read
      tests[testIndex].notifications[testNotificationIndex].read = true;
      
      // Save back to localStorage
      localStorage.setItem('assignedTests', JSON.stringify(tests));
      
      // Trigger event for other tabs
      window.dispatchEvent(new Event('assignedTestsUpdated'));
      
      // Update local state
      const updatedNotifications = [...notifications];
      updatedNotifications[notificationIndex].read = true;
      setNotifications(updatedNotifications);
      
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
        <div className="text-center p-6">
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <Link
          to="/teacher/assign-test"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Test
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Tests</p>
              <p className="text-2xl font-bold">{stats.totalTests}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Tests</p>
              <p className="text-2xl font-bold">{stats.activeTests}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Submissions</p>
              <p className="text-2xl font-bold">{stats.submissions}</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Score</p>
              <p className="text-2xl font-bold">{stats.averageScore}%</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Test Submissions */}
        <div className="lg:col-span-2">
          <TeacherResultsWidget />
        </div>
        
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          
          {notifications.length === 0 ? (
            <div className="text-center p-4 border rounded bg-gray-50">
              <p className="text-gray-500">No new notifications.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div 
                  key={index} 
                  className={`p-3 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium">
                      {notification.student}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.submittedAt).toLocaleString(undefined, {
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {notification.message}
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      to={`/teacher/view-result/${notification.testId}/${encodeURIComponent(notification.student)}`}
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      onClick={() => markNotificationAsRead(notification.testId, index)}
                    >
                      View Result
                    </Link>
                    {!notification.read && (
                      <button
                        onClick={() => markNotificationAsRead(notification.testId, index)}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;








