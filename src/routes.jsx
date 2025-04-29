// // import { useContext } from 'react'
// // import { Navigate, Outlet } from 'react-router-dom'
// // import { AuthContext } from './Context/AuthContext'
// // import Dashboard from './pages/dashboard/Dashboard'
// // import TestRecords from './pages/tests/TestRecords'
// // import Attendance from './pages/attendance/Attendance'
// // import Fees from './pages/fees/Fees'
// // import Login from './pages/auth/Login'
// // import NotFound from './pages/common/Home';
 
// // // Public Route - only accessible when not authenticated
// // export const PublicRoute = () => {
// //   const { isAuthenticated } = useContext(AuthContext)
// //   return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />
// // }

// // // Private Route - requires authentication
// // export const PrivateRoute = () => {
// //   const { isAuthenticated } = useContext(AuthContext)
// //   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
// // }


// // // Single, consolidated route configuration
// // export const appRoutes = [
// //   {
// //     path: '/login',
// //     element: <PublicRoute />,
// //     children: [{ index: true, element: <Login /> }]
// //   },
// //   {
// //     path: '/',
// //     element: <PrivateRoute />,
// //     children: [
// //       { path: 'dashboard', element: <Dashboard /> },
// //       { path: 'test-records', element: <TestRecords /> },
// //       { path: 'attendance', element: <Attendance /> },
// //       { path: 'fees', element: <Fees /> },
// //     ]
// //   },
// //   {
// //     path: '*',
// //     element: <Navigate to="/dashboard" replace />
// //   },

// //   {
// //     path: '*',
// //     element: <NotFound />
// //   }
// // ]


// // import { useContext } from 'react'
// // import { Navigate, Outlet } from 'react-router-dom'
// // import { AuthContext } from './Context/AuthContext'
// // import Dashboard from './pages/dashboard/Dashboard'
// // import TeacherDashboard from './pages/teacher/TeacherDashboard'
// // import TestRecords from './pages/tests/TestRecords'
// // import Attendance from './pages/attendance/Attendance'
// // import Fees from './pages/fees/Fees'
// // import Login from './pages/auth/Login'
// // import TeacherLogin from './pages/auth/TeacherLogin'
// // import TestAssignment from './pages/teacher/TestAssignment'
// // import NotFound from './pages/common/Home';

// // export const PublicRoute = () => {
// //   const { isAuthenticated } = useContext(AuthContext)
// //   return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />
// // }

// // export const StudentPrivateRoute = () => {
// //   const { isAuthenticated, user } = useContext(AuthContext)
// //   return isAuthenticated && user?.role === 'student' ? <Outlet /> : <Navigate to="/login" />
// // }

// // export const TeacherPrivateRoute = () => {
// //   const { isAuthenticated, user } = useContext(AuthContext)
// //   return isAuthenticated && user?.role === 'teacher' ? <Outlet /> : <Navigate to="/teacher-login" />
// // }

// // export const appRoutes = [
// //   {
// //     path: '/login',
// //     element: <PublicRoute />,
// //     children: [{ index: true, element: <Login /> }]
// //   },
// //   {
// //     path: '/teacher-login',
// //     element: <PublicRoute />,
// //     children: [{ index: true, element: <TeacherLogin /> }]
// //   },
// //   {
// //     path: '/',
// //     element: <StudentPrivateRoute />,
// //     children: [
// //       { path: 'dashboard', element: <Dashboard /> },
// //       { path: 'test-records', element: <TestRecords /> },
// //       { path: 'attendance', element: <Attendance /> },
// //       { path: 'fees', element: <Fees /> },
// //     ]
// //   },
// //   {
// //     path: '/teacher',
// //     element: <TeacherPrivateRoute />,
// //     children: [
// //       { path: 'dashboard', element: <TeacherDashboard /> },
// //       { path: 'assign-test', element: <TestAssignment /> }
// //     ]
// //   },
// //   {
// //     path: '*',
// //     element: <NotFound />
// //   }
// // ]






// import { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from './Context/AuthContext';
// import Dashboard from './pages/dashboard/Dashboard';
// import TeacherDashboard from './pages/teacher/TeacherDashboard';
// import TestRecords from './pages/tests/TestRecords';
// import Attendance from './pages/attendance/Attendance';
// import Fees from './pages/fees/Fees';
// import Login from './pages/auth/Login';
// import TeacherLogin from './pages/auth/TeacherLogin';
// import TestAssignment from './pages/teacher/TestAssignment';
// import NotFound from './pages/common/NotFound';
// import LoadingSpinner from './pages/common/LoadingSpinner';

// export const PublicRoute = () => {
//   const { isAuthenticated, user, loading } = useContext(AuthContext);
  
//   if (loading) return <LoadingSpinner/>;
  
//   if (isAuthenticated) {
//     return user?.role === 'teacher' 
//       ? <Navigate to="/teacher/dashboard" /> 
//       : <Navigate to="/dashboard" />;
//   }
  
//   return <Outlet />;
// };

// export const StudentPrivateRoute = () => {
//   const { isAuthenticated, user, loading } = useContext(AuthContext);
  
//   if (loading) return <LoadingSpinner />;
  
//   return isAuthenticated && user?.role === 'student' 
//     ? <Outlet /> 
//     : <Navigate to="/login" replace />;
// };

// export const TeacherPrivateRoute = () => {
//   const { isAuthenticated, user, loading } = useContext(AuthContext);
  
//   if (loading) return <LoadingSpinner />;
  
//   return isAuthenticated && user?.role === 'teacher' 
//     ? <Outlet /> 
//     : <Navigate to="/teacher-login" replace />;
// };

// export const appRoutes = [
//   {
//     path: '/login',
//     element: <PublicRoute />,
//     children: [{ index: true, element: <Login /> }]
//   },
//   {
//     path: '/teacher-login',
//     element: <PublicRoute />,
//     children: [{ index: true, element: <TeacherLogin /> }]
//   },
//   {
//     path: '/',
//     element: <StudentPrivateRoute />,
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: 'dashboard', element: <Dashboard /> },
//       { path: 'test-records', element: <TestRecords /> },
//       { path: 'attendance', element: <Attendance /> },
//       { path: 'fees', element: <Fees /> },
//     ]
//   },
//   {
//     path: '/teacher',
//     element: <TeacherPrivateRoute />,
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: 'dashboard', element: <TeacherDashboard /> },
//       { path: 'assign-test', element: <TestAssignment /> }
//     ]
//   },
//   {
//     path: '/404',
//     element: <NotFound />
//   },
//   {
//     path: '*',
//     element: <Navigate to="/404" replace />
//   }
// ];




import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import Dashboard from './pages/dashboard/Dashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TestRecords from './pages/tests/TestRecords';
import Attendance from './pages/attendance/Attendance';
import Fees from './pages/fees/Fees';
import Login from './pages/auth/Login';
import TeacherLogin from './pages/auth/TeacherLogin';
import TestAssignment from './pages/teacher/TestAssignment';
import AssignedTests from './pages/tests/AssignedTests';
import NotFound from './pages/common/NotFound';
import LoadingSpinner from './pages/common/LoadingSpinner';

export const PublicRoute = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  
  if (loading) return <LoadingSpinner/>;
  
  if (isAuthenticated) {
    return user?.role === 'teacher' 
      ? <Navigate to="/teacher/dashboard" /> 
      : <Navigate to="/dashboard" />;
  }
  
  return <Outlet />;
};

export const StudentPrivateRoute = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  
  if (loading) return <LoadingSpinner />;
  
  return isAuthenticated && user?.role === 'student' 
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
};

export const TeacherPrivateRoute = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  
  if (loading) return <LoadingSpinner />;
  
  return isAuthenticated && user?.role === 'teacher' 
    ? <Outlet /> 
    : <Navigate to="/teacher-login" replace />;
};

// export const appRoutes = [
//   {
//     path: '/login',
//     element: <PublicRoute />,
//     children: [{ index: true, element: <Login /> }]
//   },
//   {
//     path: '/teacher-login',
//     element: <PublicRoute />,
//     children: [{ index: true, element: <TeacherLogin /> }]
//   },
//   {
//     path: '/',
//     element: <StudentPrivateRoute />,
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: 'dashboard', element: <Dashboard /> },
//       { path: 'assigned-tests', element: <AssignedTests /> },
//       { path: 'test-records', element: <TestRecords /> },
//       { path: 'attendance', element: <Attendance /> },
//       { path: 'fees', element: <Fees /> },
//     ]
//   },
//   {
//     path: '/teacher',
//     element: <TeacherPrivateRoute />,
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: 'dashboard', element: <TeacherDashboard /> },
//       { path: 'assign-test', element: <TestAssignment /> }
//     ]
//   },
//   {
//     path: '/404',
//     element: <NotFound />
//   },
//   {
//     path: '*',
//     element: <Navigate to="/404" replace />
//   }
// ];