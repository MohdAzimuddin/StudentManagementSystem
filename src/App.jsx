import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { PublicRoute, PrivateRoute } from './routes';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import TestRecords from './pages/tests/TestRecords';
import Attendance from './pages/attendance/Attendance';
import Fees from './pages/fees/Fees';
import Home from './pages/common/Home';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
 
const App = () => {
  const [studentName, setStudentName] = useState(""); // Store student's name

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard studentName={studentName} />} />
              <Route path="/test-records" element={<TestRecords />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/fees" element={<Fees />} />
            </Route>
          </Route>

          {/* Home route - pass setStudentName to update state */}
          <Route path="*" element={<Home setStudentName={setStudentName} />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
