import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useState } from 'react';

const Home = ({ setStudentName }) => {
  const { isAuthenticated, user } = useAuth();
  const [name, setName] = useState('');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const getRedirectPath = () => {
    if (!isAuthenticated) return '/login';
    return user?.role === 'teacher' ? '/teacher/dashboard' : '/dashboard';
  };

  const handleSubmit = (e) => {
    if (user?.role === 'student' && !name.trim()) {
      e.preventDefault();
      return;
    }
    if (user?.role === 'student') {
      setStudentName(name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary mb-4">Welcome</h1>
        
        {!isAuthenticated && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enter your name to continue
            </h2>
            <input
              type="text"
              placeholder="ex: Azeemuddin"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
          </>
        )}

        <div className="mt-4 space-y-2">
          <Link
            to={getRedirectPath()}
            onClick={handleSubmit}
            className={`block px-6 py-3 rounded-lg text-white transition-colors ${
              isAuthenticated || name.trim() 
                ? 'bg-primary hover:bg-indigo-600' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isAuthenticated 
              ? user?.role === 'teacher' 
                ? 'Go to Teacher Dashboard' 
                : 'Go to Student Dashboard'
              : 'Studnet Login'}
          </Link>

          {!isAuthenticated && (
            <Link
              to="/teacher-login"
              className="block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Teacher Login
            </Link>
          )}
        </div>

        <div className="mt-4 text-gray-500 text-sm">
          Need help?{' '}
          <a href="mailto:support@studentportal.com" className="text-primary hover:underline">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;