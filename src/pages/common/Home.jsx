import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useState } from 'react';

const Home = ({ setStudentName }) => {
  const { isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!name.trim()) {
      e.preventDefault(); // Prevent navigation if name is empty
      return;
    }
    setStudentName(name); // Save name for Dashboard
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary mb-4">Welcome</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter your name to continue</h2>
        <input
          type="text"
          placeholder="ex: Azeemuddin"
          value={name}
          onChange={handleNameChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="mt-4">
          <Link
            to={isAuthenticated ? '/dashboard' : '/login'}
            onClick={handleSubmit}
            className={`block px-6 py-3 rounded-lg text-white transition-colors ${
              name.trim() ? 'bg-primary hover:bg-indigo-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
          </Link>
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
