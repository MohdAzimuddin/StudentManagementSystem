import { Link, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Student Portal</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/test-records" className="nav-link">Test Records</Link>
              <Link to="/attendance" className="nav-link">Attendance</Link>
              <Link to="/fees" className="nav-link">Fees</Link>
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 flex flex-col space-y-3">
          <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/test-records" className="nav-link" onClick={() => setMenuOpen(false)}>Test Records</Link>
          <Link to="/attendance" className="nav-link" onClick={() => setMenuOpen(false)}>Attendance</Link>
          <Link to="/fees" className="nav-link" onClick={() => setMenuOpen(false)}>Fees</Link>
        </div>
      )}

      {/* User Info and Logout */}
      <div className="max-w-7xl mx-auto flex justify-end items-center p-4">
        <span className="text-gray-700 mr-4">{user?.name}</span>
        <button onClick={logout} className="px-3 py-1 bg-red-300 text-gray-800 rounded-md text-sm hover:bg-red-600 flex items-center space-x-2">
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
