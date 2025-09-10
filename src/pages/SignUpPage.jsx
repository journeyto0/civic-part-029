import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    location: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    login(formData); // Using login function for signup simulation
    navigate('/dashboard');
  };
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <div className="text-center mb-6">
        <UserPlus className="mx-auto h-12 w-12 text-blue-500" />
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Create an Account</h2>
        <p className="mt-2 text-sm text-gray-600">Join to make your community better.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
            <button type="button" onClick={() => setFormData({...formData, role: 'user'})} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${formData.role === 'user' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                I am a Citizen
            </button>
            <button type="button" onClick={() => setFormData({...formData, role: 'admin'})} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${formData.role === 'admin' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                I am an Authority
            </button>
        </div>
        <input name="name" type="text" placeholder="Full Name" required onChange={handleChange} className="w-full border-gray-300 p-3 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        <input name="location" type="text" placeholder="Residence Location (e.g., Delhi)" required onChange={handleChange} className="w-full border-gray-300 p-3 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full border-gray-300 p-3 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} className="w-full border-gray-300 p-3 rounded-md focus:ring-blue-500 focus:border-blue-500" />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button type="submit" className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-semibold transition-transform active:scale-95">
          Sign Up <ArrowRight size={18} />
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Log in</Link>
      </p>
    </motion.div>
  );
}
