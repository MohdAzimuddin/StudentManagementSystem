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
import TestResult from './pages/tests/TestResult';
import CompletedTests from './pages/tests/CompletedTests';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import TeacherViewResult from './pages/teacher/TeacherViewResult';
import TeacherLayout from './components/layout/TeacherLayout';

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
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
        </Route>
        
        {/* Student Routes */}
        <Route element={<StudentPrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assigned-tests" element={<AssignedTests />} />
            <Route path="/completed-tests" element={<CompletedTests />} />
            <Route path="/test-records" element={<TestRecords />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/take-test/:testId" element={<TakeTest />} />
            <Route path="/test-result/:testId" element={<TestResult/>} />
          </Route>
        </Route>
        
        {/* Teacher Routes */}
        <Route element={<TeacherPrivateRoute />}>
          <Route element={<TeacherLayout />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/assign-test" element={<TestAssignment />} />
            {/* Fix: Add route with parameters for viewing individual student results */}
            <Route path="/teacher/view-result/:testId/:studentId" element={<TeacherViewResult />} />
            {/* Keep the general route for viewing all results */}
            <Route path="/teacher/view-results" element={<TeacherViewResult />} />
          </Route>
        </Route>
        
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </AuthProvider>
  );
};

export default AppContent;