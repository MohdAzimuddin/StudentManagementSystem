import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const TeacherDashboard = () => {
const { user, logout } = useAuth();
const navigate = useNavigate();
const [notifications, setNotifications] = useState([]);

useEffect(() => {
const tests = JSON.parse(localStorage.getItem('assignedTests')) || [];

// const allNotifications = tests.flatMap(test =>
// test.notifications?.map(n => ({ ...n, testTitle: test.title })) || [];
const allNotifications = tests.flatMap(test =>
  test.notifications?.map(n => ({ ...n, testTitle: test.title })) || []
);

setNotifications(allNotifications);
}, []);

return (
<div className="p-6">
<h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

  <div className="bg-white rounded-lg shadow p-4">
    <h2 className="text-xl mb-4">Welcome, {user?.name}</h2>

    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Recent Submissions</h3>
      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div key={index} className="border rounded p-2">
              <p>Student: {notification.student}</p>
              <p>Test: {notification.testTitle}</p>
              <p className="text-sm text-gray-600">
                Submitted at: {new Date(notification.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent submissions</p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        className="bg-blue-100 p-4 rounded-lg cursor-pointer hover:bg-blue-200"
        onClick={() => navigate('/teacher/assign-test')}
      >
        <h3 className="font-bold text-lg mb-2">Assign New Test</h3>
        <p>Create and assign MCQ tests to students</p>
      </div>
    </div>
  </div>
</div>
);
};

export default TeacherDashboard; 