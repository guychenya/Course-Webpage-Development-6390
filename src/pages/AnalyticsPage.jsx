import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';

const { FiBookOpen, FiUser, FiLogOut, FiBarChart3 } = FiIcons;

const AnalyticsPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiBookOpen} className="text-3xl text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MarketMinds Academy</h1>
                <p className="text-xs text-gray-500">Digital Marketing Courses Hub</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-gray-600" />
                <span className="text-gray-700 font-medium">Welcome back!</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <SafeIcon icon={FiLogOut} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <SafeIcon icon={FiBarChart3} className="mr-3 text-primary-600" />
              Analytics Dashboard
            </h2>
            <p className="text-gray-600">Comprehensive insights into user behavior and course performance</p>
          </div>

          <AnalyticsDashboard />
        </motion.div>
      </main>
    </div>
  );
};

export default AnalyticsPage;