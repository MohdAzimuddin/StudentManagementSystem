import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import Dashboard from './pages/dashboard/Dashboard'
import TestRecords from './pages/tests/TestRecords'
import Attendance from './pages/attendance/Attendance'
import Fees from './pages/fees/Fees'
import Login from './pages/auth/Login'
import NotFound from './pages/common/Home';

// Public Route - only accessible when not authenticated
export const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />
}

// Private Route - requires authentication
export const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}


// Single, consolidated route configuration
export const appRoutes = [
  {
    path: '/login',
    element: <PublicRoute />,
    children: [{ index: true, element: <Login /> }]
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'test-records', element: <TestRecords /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'fees', element: <Fees /> },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  },
  // ... all your other routes
  {
    path: '*',
    element: <NotFound />
  }
]


