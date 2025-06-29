import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock, FiUsers, FiTrendingUp, FiAward } = FiIcons;

const Hero = () => {
  const stats = [
    { icon: FiClock, value: '8 Weeks', label: 'Duration' },
    { icon: FiUsers, value: '500+', label: 'Students' },
    { icon: FiTrendingUp, value: '98%', label: 'Success Rate' },
    { icon: FiAward, value: 'Certified', label: 'Course' },
  ];

  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Complete Digital Marketing 
              <span className="text-accent-500"> Mastery</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100">
              From Zero to Marketing Pro in 8 Weeks
            </p>
            <p className="text-lg mb-8 text-primary-200 leading-relaxed">
              Master Google Ads, email marketing, social media strategy, and conversion optimization. 
              Build real campaigns that generate leads and drive sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-all duration-200 transform hover:scale-105">
                Start Learning Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
                View Curriculum
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Course Highlights</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <SafeIcon 
                      icon={stat.icon} 
                      className="text-3xl text-accent-500 mx-auto mb-3" 
                    />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-primary-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;