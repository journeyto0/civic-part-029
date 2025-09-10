import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, HeartPulse, LightbulbOff, Clock, Zap } from 'lucide-react';

const StatCard = ({ icon, value, text, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center shadow-sm">
            <div className="text-blue-500 w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100">{React.cloneElement(icon, { size: 28 })}</div>
      <h3 className="text-2xl font-bold mt-4 text-slate-800">{value}</h3>
      <p className="text-slate-500 mt-1 text-sm">{text}</p>
        </motion.div>
);

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <section className="text-center py-12 bg-white rounded-lg shadow-lg">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-gray-800">
                 Solving Civic Issues, <span className="text-blue-600">Together.</span>
            </motion.h1>
            <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                 Report, track, and help resolve problems in your community with a single click. Join the movement.
            </motion.p>
        </section>

        {/* Stats Section */}
      <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Trash2 />} value="62M Tons" text="Waste generated yearly." delay={0.2} />
            <StatCard icon={<HeartPulse />} value="4,000+" text="Deaths by potholes." delay={0.4} />
            <StatCard icon={<LightbulbOff />} value="30%" text="Non-functional streetlights." delay={0.6} />
            <StatCard icon={<Clock />} value="2-3 Weeks" text="Avg. resolution time." delay={0.8} />
          </div>
      </section>
      {/* How it Works Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold">Ready to Make a Difference?</h2>
        <p className="mt-2 max-w-xl mx-auto">Join thousands of citizens making their communities better, one issue at a time.</p>
        <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-block">
                <Link to="/signup" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
            <Zap size={20} /> Get Started Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
