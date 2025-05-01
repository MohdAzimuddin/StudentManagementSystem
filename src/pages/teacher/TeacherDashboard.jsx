// // src/pages/teacher/TeacherDashboard.jsx
// import { useAuth } from '../../Context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

// const TeacherDashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [testStats, setTestStats] = useState({
//     active: 0,
//     completed: 0,
//     upcoming: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
    
//     // Set up event listeners for updates
//     const handleStorageChange = () => {
//       console.log("Storage changed, refreshing dashboard data");
//       fetchDashboardData();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('assignedTestsUpdated', handleStorageChange);
    
//     // Refresh data every 30 seconds
//     const interval = setInterval(fetchDashboardData, 30000);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('assignedTestsUpdated', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, [user]);

//   const fetchDashboardData = () => {
//     try {
//       // Get tests from localStorage
//       const storedTests = localStorage.getItem('assignedTests');
//       if (!storedTests) return;
      
//       const tests = JSON.parse(storedTests);
      
//       // Filter tests created by this teacher
//       const teacherTests = tests.filter(test => 
//         test.createdBy === user?.email || test.teacherName === user?.name
//       );
      
//       // Extract notifications from all of this teacher's tests
//       const allNotifications = teacherTests.flatMap(test => 
//         (test.notifications || []).map(notification => ({
//           ...notification,
//           testId: test.id,
//           testTitle: test.title
//         }))
//       );
      
//       // Sort notifications by submission time (newest first)
//       allNotifications.sort((a, b) => 
//         new Date(b.submittedAt) - new Date(a.submittedAt)
//       );
      
//       setNotifications(allNotifications);
      
//       // Calculate test statistics
//       const now = new Date();
//       const stats = {
//         active: 0,
//         completed: 0,
//         upcoming: 0
//       };
      
//       const recentTestActivity = [];
      
//       teacherTests.forEach(test => {
//         const dueDate = new Date(test.dueDate);
        
//         // Count students who completed the test
//         const completedCount = Object.keys(test.results || {}).length;
        
//         if (dueDate < now) {
//           stats.completed++;
//         } else {
//           stats.active++;
          
//           // Add to recent activity if it has notifications
//           if ((test.notifications || []).length > 0) {
//             // Get most recent submission
//             const latestNotification = [...(test.notifications || [])].sort(
//               (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
//             )[0];
            
//             recentTestActivity.push({
//               id: test.id,
//               title: test.title,
//               type: 'submission',
//               date: latestNotification.submittedAt,
//               message: `${latestNotification.student} submitted this test`,
//               completedCount: completedCount
//             });
//           } else {
//             // If no notifications, show the test creation
//             recentTestActivity.push({
//               id: test.id,
//               title: test.title,
//               type: 'creation',
//               date: test.assignedDate,
//               message: 'You created this test',
//               completedCount: completedCount
//             });
//           }
//         }
//       });
      
//       // Sort activity by date (newest first)
//       recentTestActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
      
//       setTestStats(stats);
//       setRecentActivity(recentTestActivity.slice(0, 5)); // Show only 5 most recent
      
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     }
//   };

//   // Mark a notification as read
//   const markNotificationAsRead = (notificationIndex, testId) => {
//     try {
//       const storedTests = localStorage.getItem('assignedTests');
//       if (!storedTests) return;
      
//       const tests = JSON.parse(storedTests);
//       const testIndex = tests.findIndex(t => t.id === testId);
      
//       if (testIndex === -1) return;
      
//       // Find the notification in the test's notifications array
//       const notification = notifications[notificationIndex];
//       const notificationIndexInTest = tests[testIndex].notifications?.findIndex(
//         n => n.submittedAt === notification.submittedAt && n.student === notification.student
//       );
      
//       if (notificationIndexInTest === -1 || notificationIndexInTest === undefined) return;
      
//       // Mark as read
//       tests[testIndex].notifications[notificationIndexInTest].read = true;
      
//       // Save back to localStorage
//       localStorage.setItem('assignedTests', JSON.stringify(tests));
      
//       // Update state
//       const updatedNotifications = [...notifications];
//       updatedNotifications[notificationIndex].read = true;
//       setNotifications(updatedNotifications);
      
//       // Trigger event for other tabs
//       window.dispatchEvent(new Event('assignedTestsUpdated'));
      
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {/* Stats Cards */}
//         <div className="bg-blue-50 rounded-lg shadow p-4 border border-blue-100">
//           <h3 className="text-lg font-bold text-blue-700 mb-2">Active Tests</h3>
//           <p className="text-3xl font-bold text-blue-600">{testStats.active}</p>
//           <p className="text-sm text-blue-600 mt-1">Tests currently available to students</p>
//         </div>
        
//         <div className="bg-green-50 rounded-lg shadow p-4 border border-green-100">
//           <h3 className="text-lg font-bold text-green-700 mb-2">Completed Tests</h3>
//           <p className="text-3xl font-bold text-green-600">{testStats.completed}</p>
//           <p className="text-sm text-green-600 mt-1">Tests past their due date</p>
//         </div>
        
//         <div className="bg-purple-50 rounded-lg shadow p-4 border border-purple-100">
//           <h3 className="text-lg font-bold text-purple-700 mb-2">New Submissions</h3>
//           <p className="text-3xl font-bold text-purple-600">{notifications.filter(n => !n.read).length}</p>
//           <p className="text-sm text-purple-600 mt-1">Unread test submissions</p>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Column - Actions */}
//         <div className="md:col-span-1 space-y-4">
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            
//             <div className="space-y-3">
//               <div
//                 className="bg-blue-100 p-4 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors"
//                 onClick={() => navigate('/teacher/assign-test')}
//               >
//                 <h3 className="font-bold text-blue-700 mb-1">Assign New Test</h3>
//                 <p className="text-sm text-blue-600">Create and assign MCQ tests to students</p>
//               </div>
              
//               <div
//                 className="bg-green-100 p-4 rounded-lg cursor-pointer hover:bg-green-200 transition-colors"
//                 onClick={() => navigate('/teacher/view-results')}
//               >
//                 <h3 className="font-bold text-green-700 mb-1">View Results</h3>
//                 <p className="text-sm text-green-600">See how your students performed</p>
//               </div>
              
//               {/* <div
//                 className="bg-purple-100 p-4 rounded-lg cursor-pointer hover:bg-purple-200 transition-colors"
//                 onClick={() => navigate('/teacher/manage-tests')}
//               >
//                 <h3 className="font-bold text-purple-700 mb-1">Manage Tests</h3>
//                 <p className="text-sm text-purple-600">Edit, delete or extend test deadlines</p>
//               </div> */}
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow p-4">
//             <h3 className="text-lg font-bold mb-3">Recent Activity</h3>
            
//             {recentActivity.length > 0 ? (
//               <div className="space-y-3">
//                 {recentActivity.map((activity, index) => (
//                   <div 
//                     key={index} 
//                     className="border-b pb-2 last:border-b-0 last:pb-0"
//                   >
//                     <p className="font-medium">{activity.title}</p>
//                     <p className="text-sm text-gray-600">{activity.message}</p>
//                     <div className="flex justify-between mt-1">
//                       <p className="text-xs text-gray-500">
//                         {formatDate(activity.date)}
//                       </p>
//                       {activity.type === 'submission' && (
//                         <p className="text-xs text-blue-600">
//                           {activity.completedCount} submissions
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm">No recent activity</p>
//             )}
//           </div>
//         </div>
        
//         {/* Right Column - Notifications */}
//         <div className="md:col-span-2">
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-bold mb-4">Test Submissions</h2>
            
//             {notifications.length > 0 ? (
//               <div className="space-y-3">
//                 {notifications.map((notification, index) => (
//                   <div 
//                     key={index} 
//                     className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}
//                   >
//                     <div className="flex justify-between">
//                       <div className="flex-1">
//                         <p className="font-medium">
//                           {notification.student} submitted {notification.testTitle}
//                         </p>
//                         <p className="text-sm text-gray-600 mt-1">
//                           Submitted at: {formatDate(notification.submittedAt)}
//                         </p>
//                       </div>
//                       <div className="ml-4 flex">
//                         <button 
//                           onClick={() => navigate(`/teacher/view-result/${notification.testId}/${encodeURIComponent(notification.student)}`)}
//                           className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 mr-2"
//                         >
//                           View Result
//                         </button>
                        
//                         {!notification.read && (
//                           <button 
//                             onClick={() => markNotificationAsRead(index, notification.testId)}
//                             className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
//                           >
//                             Mark Read
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No submissions yet</p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   When students submit tests, you'll see their results here
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;




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








