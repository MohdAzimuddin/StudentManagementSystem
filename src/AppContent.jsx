// AppContent.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { PublicRoute, StudentPrivateRoute, TeacherPrivateRoute } from './routes';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import TeacherLogin from './pages/auth/TeacherLogin';
import Dashboard from './pages/dashboard/Dashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TestAssignment from './pages/teacher/TestAssignment';
import TestRecords from './pages/tests/TestRecords';
import Attendance from './pages/attendance/Attendance';
import Fees from './pages/fees/Fees';
import Home from './pages/common/Home';
import TakeTest from './pages/tests/Taketest';
import AssignedTests from './pages/tests/AssignedTests';
import NotFound from './pages/common/NotFound';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const AppContent = () => {
  useEffect(() => {
    const handleStorageSync = () => {
      window.dispatchEvent(new Event('assignedTestsUpdated'));
    };

    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
        </Route>

        <Route element={<StudentPrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assigned-tests" element={<AssignedTests />} />
            <Route path="/test-records" element={<TestRecords />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/take-test/:testId" element={<TakeTest />} />
          </Route>
        </Route>

        <Route element={<TeacherPrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/assign-test" element={<TestAssignment />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </AuthProvider>
  );
};

export default AppContent;
