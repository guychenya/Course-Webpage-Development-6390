import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBookOpen, FiUser, FiLogOut, FiTrendingUp, FiUsers, FiAward, FiClock, FiBarChart3 } = FiIcons;

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: FiClock, value: '8 Weeks', label: 'Course Duration' },
    { icon: FiUsers, value: '500+', label: 'Students' },
    { icon: FiTrendingUp, value: '98%', label: 'Success Rate' },
    { icon: FiAward, value: 'Certified', label: 'Course' }
  ];

  const quickActions = [
    { 
      title: 'View Analytics', 
      description: 'Track your learning progress',
      icon: FiBarChart3,
      action: () => navigate('/analytics'),
      color: 'bg-blue-500'
    },
    { 
      title: 'Continue Learning', 
      description: 'Pick up where you left off',
      icon: FiBookOpen,
      action: () => console.log('Continue learning'),
      color: 'bg-green-500'
    }
  ];

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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600">Welcome to your Digital Marketing Mastery course dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <SafeIcon icon={stat.icon} className="text-3xl text-primary-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                onClick={action.action}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${action.color} bg-opacity-10`}>
                    <SafeIcon icon={action.icon} className={`text-2xl ${action.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8"
          >
            <h3 className="text-2xl font-bold mb-4">🎉 Welcome to Your Learning Journey!</h3>
            <p className="text-primary-100 mb-6">
              You've successfully completed the onboarding process. Your personalized learning experience is now ready!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => console.log('Start first module')}
                className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-200"
              >
                Start First Module
              </button>
              <button 
                onClick={() => navigate('/analytics')}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View Analytics
              </button>
            </div>
          </motion.div>

          {/* Course Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Course Completion</span>
                <span className="text-primary-600 font-semibold">0% (Just Started!)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
              <p className="text-sm text-gray-600">
                Ready to begin your digital marketing transformation? Let's start with Module 1!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;