import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle } = FiIcons;

const LearningObjectives = () => {
  const objectives = [
    'Create and optimize Google Ads campaigns that generate at least 50 qualified leads within 30 days',
    'Build an email list of 500+ subscribers using lead magnets and landing pages you design yourself',
    'Develop a comprehensive social media strategy and grow your following by 200% across two platforms',
    'Analyze website traffic using Google Analytics and identify three specific areas for conversion optimization',
    'Launch a complete sales funnel that converts at least 2% of visitors into paying customers'
  ];

  return (
    <section id="objectives" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Learning Objectives
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              By the end of this course, you'll have concrete, measurable results 
              that prove your digital marketing expertise.
            </p>
            <div className="bg-primary-600 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">Success Guarantee</h3>
              <p>
                We're so confident in our methods that we guarantee you'll achieve 
                these objectives or get your money back.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm"
              >
                <SafeIcon 
                  icon={FiCheckCircle} 
                  className="text-2xl text-green-500 flex-shrink-0 mt-1" 
                />
                <p className="text-gray-700 leading-relaxed">
                  {objective}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LearningObjectives;