import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiStar, FiClock, FiUsers, FiAward } = FiIcons;

const Pricing = () => {
  const features = [
    '8 weeks of comprehensive training',
    '2 complete modules with hands-on projects',
    'Live Q&A sessions with instructors',
    'Access to private student community',
    'Lifetime access to course materials',
    'Certificate of completion',
    'Money-back guarantee',
    'Personal project feedback',
    'Industry tools and templates',
    'Career guidance and support'
  ];

  const bonuses = [
    { icon: FiStar, title: 'Google Ads Templates', value: '$297' },
    { icon: FiUsers, title: 'Email Marketing Toolkit', value: '$197' },
    { icon: FiAward, title: 'Social Media Calendar', value: '$97' },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get everything you need to master digital marketing and start seeing results 
            in just 8 weeks.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-accent-500 text-white px-6 py-2 rounded-bl-2xl font-bold">
              LIMITED TIME
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                  Complete Digital Marketing Mastery
                </h3>
                <div className="mb-8">
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl line-through text-primary-200 mr-4">$1,997</span>
                    <span className="text-5xl font-bold">$497</span>
                  </div>
                  <p className="text-primary-200">One-time payment • Lifetime access</p>
                </div>

                <div className="space-y-3 mb-8">
                  {features.slice(0, 5).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <SafeIcon icon={FiCheck} className="text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <button className="bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-600 transition-all duration-200 transform hover:scale-105 w-full lg:w-auto">
                  Enroll Now - Save $1,500
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">What's Included:</h4>
                  <div className="space-y-2">
                    {features.slice(5).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <SafeIcon icon={FiCheck} className="text-green-400 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-accent-500/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">FREE Bonuses (Worth $591):</h4>
                  <div className="space-y-3">
                    {bonuses.map((bonus, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <SafeIcon icon={bonus.icon} className="mr-3" />
                          <span className="text-sm">{bonus.title}</span>
                        </div>
                        <span className="font-bold">{bonus.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-500/30 text-center">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <SafeIcon icon={FiClock} className="mr-2" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiUsers} className="mr-2" />
                  <span>500+ Success Stories</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiAward} className="mr-2" />
                  <span>Certified Course</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 mb-4">
              🔒 Secure payment • 💳 All major cards accepted • 📱 Instant access
            </p>
            <p className="text-sm text-gray-500">
              Join hundreds of successful students who've transformed their businesses with our proven system.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;