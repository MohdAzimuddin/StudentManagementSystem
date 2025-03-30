import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
 
  // Student-only data
  const mockStudents = [
    {
      id: 1,
      email: 'student@example.com',
      password: 'password', // Never store plain passwords in production
      name: 'Student User',
    }
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userEmail = localStorage.getItem('userEmail');
          const student = mockStudents.find(s => s.email === userEmail);
          
          if (student) {
            setUser(student);
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

  const login = async (email, password) => {
    try {
      setLoading(true);
      const student = mockStudents.find(s => 
        s.email === email && s.password === password
      );

      if (student) {
        localStorage.setItem('token', 'student-mock-token');
        localStorage.setItem('userEmail', student.email);
        setUser(student);
        setIsAuthenticated(true);
        toast.success(`Welcome ${student.name}!`);
        return true;
      }
      
      throw new Error('Invalid student credentials');
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
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
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
      {children}
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

