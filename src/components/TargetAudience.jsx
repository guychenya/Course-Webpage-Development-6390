import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBriefcase, FiUsers, FiTrendingUp, FiClock } = FiIcons;

const TargetAudience = () => {
  const audiences = [
    {
      icon: FiBriefcase,
      title: 'Small Business Owners',
      description: 'Ready to take control of your marketing and grow your business online'
    },
    {
      icon: FiUsers,
      title: 'Entrepreneurs',
      description: 'Looking to launch or scale your startup with proven digital strategies'
    },
    {
      icon: FiTrendingUp,
      title: 'Career Changers',
      description: 'Transitioning into digital marketing with no prior experience required'
    },
    {
      icon: FiClock,
      title: 'Motivated Learners',
      description: 'Can dedicate 5-7 hours per week to learning and implementing'
    }
  ];

  const requirements = [
    'Comfortable using computers and social media platforms',
    'No prior marketing knowledge required',
    'Motivated self-starter attitude',
    'Access to internet and basic computer setup',
    'Willingness to implement what you learn'
  ];

  return (
    <section id="audience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Is This Course Right for You?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfect for beginners who feel overwhelmed by digital marketing jargon 
            and want a clear, step-by-step path to success.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Perfect For
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {audiences.map((audience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <SafeIcon 
                    icon={audience.icon} 
                    className="text-3xl text-primary-600 mb-4" 
                  />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {audience.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {audience.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Prerequisites
            </h3>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="text-gray-600 mb-6">
                No marketing experience needed! Here's what you should have:
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0"></span>
                    {requirement}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-800 font-medium">
                  💡 Don't worry if you're completely new to marketing - 
                  we start from the very basics and build up your expertise step by step!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;