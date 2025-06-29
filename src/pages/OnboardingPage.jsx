import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import questConfig from '../../questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBookOpen, FiTarget, FiTrendingUp, FiUsers, FiArrowRight } = FiIcons;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('authToken');
    
    if (!storedUserId || !storedToken) {
      navigate('/login');
      return;
    }
    
    setUserId(storedUserId);
    setToken(storedToken);
  }, [navigate]);

  const getAnswers = () => {
    // Navigate to main dashboard after onboarding completion
    navigate('/dashboard');
  };

  const steps = [
    { icon: FiTarget, text: 'Define Your Goals' },
    { icon: FiTrendingUp, text: 'Choose Your Path' },
    { icon: FiUsers, text: 'Join Your Community' }
  ];

  if (!userId || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Left Section - Branding & Progress */}
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
              Let's Get You
              <span className="text-accent-500"> Started!</span>
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              We're setting up your personalized learning experience. This will only take a few minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Setup Progress:</h3>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <SafeIcon icon={step.icon} className="text-white" />
                </div>
                <span className="text-primary-100 text-lg">{step.text}</span>
                <SafeIcon icon={FiArrowRight} className="text-accent-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          >
            <h4 className="text-lg font-semibold text-white mb-2">Why This Matters</h4>
            <p className="text-primary-100 text-sm">
              Your answers help us customize your learning path, recommend relevant content, and connect you with peers who share similar goals.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-500/20 rounded-full blur-lg"></div>
      </div>

      {/* Right Section - Onboarding Component */}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Get Started!</h2>
            <p className="text-gray-600">Setting up your personalized experience</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="hidden lg:block p-6 border-b border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Setup</h2>
              <p className="text-gray-600">Tell us about your goals and preferences</p>
            </div>

            <div className="quest-onboarding-container" style={{ minHeight: '400px' }}>
              <OnBoarding
                userId={userId}
                token={token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              You can always update these preferences later in your account settings
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;