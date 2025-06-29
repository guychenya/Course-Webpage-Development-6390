import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiTrendingUp, FiUsers, FiBarChart3 } = FiIcons;

const CourseOverview = () => {
  const features = [
    {
      icon: FiTarget,
      title: 'Google Ads Mastery',
      description: 'Create campaigns that generate 50+ qualified leads in 30 days'
    },
    {
      icon: FiUsers,
      title: 'Email List Building',
      description: 'Build an email list of 500+ subscribers using proven strategies'
    },
    {
      icon: FiTrendingUp,
      title: 'Social Media Growth',
      description: 'Grow your following by 200% across two platforms'
    },
    {
      icon: FiBarChart3,
      title: 'Analytics & Optimization',
      description: 'Master Google Analytics and conversion optimization'
    }
  ];

  return (
    <section id="overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What You'll Master
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This comprehensive course transforms beginners into confident digital marketers 
            with hands-on experience and real-world results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <SafeIcon 
                icon={feature.icon} 
                className="text-4xl text-primary-600 mb-4" 
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;