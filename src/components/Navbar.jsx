import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

    return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CivicSense
        </Link>
        <div className="hidden md:flex items-center space-x-6 text-gray-600 font-semibold">
            <Link to="#" className="hover:text-blue-600">Issues</Link>
            <Link to="#" className="hover:text-blue-600">Impact</Link>
            <Link to="#" className="hover:text-blue-600">About</Link>
            <Link to="#" className="hover:text-blue-600">Contact</Link>
        </div>
        <div className="flex items-center space-x-2">
            {isAuthenticated ? (
                <>
                    <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600">
                 {user.role === 'admin' ? <Shield size={20} /> : <User size={20} />} {user.name}
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 font-semibold">
                Logout
              </button>
            </>
            ) : (
            <>
            <Link to="/login" className="font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100">
                Login
            </Link>
            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-semibold">
                Register
            </Link>
            </>
            )}
        </div>
      </div>
    </nav>
  );
}