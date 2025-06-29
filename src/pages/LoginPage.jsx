import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../context/AuthContext';
import questConfig from '../../questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBookOpen, FiTrendingUp, FiUsers, FiAward } = FiIcons;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ userId, token, newUser }) => {
    login({ userId, token });
    
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const features = [
    { icon: FiTrendingUp, text: 'Master Digital Marketing' },
    { icon: FiUsers, text: '500+ Success Stories' },
    { icon: FiAward, text: 'Industry Certified' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiBookOpen} className="text-4xl text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Learms</h1>
                <p className="text-primary-200">Digital Marketing Mastery</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome Back to Your
              <span className="text-accent-500"> Marketing Journey</span>
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Continue building your digital marketing expertise with our comprehensive course platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <SafeIcon icon={feature.icon} className="text-2xl text-accent-500" />
                <span className="text-primary-100 text-lg">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-500/20 rounded-full blur-lg"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SafeIcon icon={FiBookOpen} className="text-3xl text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Learms</h1>
                <p className="text-gray-600 text-sm">Digital Marketing Course</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Continue your marketing journey</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your learning</p>
            </div>

            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                New to our platform?{' '}
                <span className="text-primary-600 font-medium cursor-pointer hover:text-primary-700">
                  Create an account through the form above
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;