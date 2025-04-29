// src/Context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // for redirection

  const mockStudents = [
    {
      id: 1,
      email: 'student@example.com',
      password: 'password',
      name: 'Student User',
      role: 'student'
    }
  ];

  const mockTeachers = [
    {
      id: 101,
      email: 'teacher@example.com',
      password: 'teach123',
      name: 'Math Mentor',
      role: 'teacher',
      subjects: ['Mathematics', 'Physics']
    }
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');

        if (token && userEmail && userRole) {
          const userPool = userRole === 'teacher' ? mockTeachers : mockStudents;
          const user = userPool.find(u => u.email === userEmail);

          if (user) {
            setUser(user);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
        toast.error('Session validation failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, isTeacher = false) => {
    try {
      setLoading(true);
      const userPool = isTeacher ? mockTeachers : mockStudents;
      const user = userPool.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('token', `${user.role}-mock-token`);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);
        setUser(user);
        setIsAuthenticated(true);
        toast.success(`Welcome ${user.name}!`);
        return true;
      }
      throw new Error(`Invalid ${isTeacher ? 'teacher' : 'student'} credentials`);
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/'); //  Redirect to homepage
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
