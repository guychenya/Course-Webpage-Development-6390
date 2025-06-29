import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiBookOpen } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: '#overview' },
    { name: 'Objectives', href: '#objectives' },
    { name: 'Modules', href: '#modules' },
    { name: 'Audience', href: '#audience' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiBookOpen} className="text-3xl text-primary-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Learms</h1>
              <p className="text-xs text-gray-500">Digital Marketing Course</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Sign In
            </button>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Enroll Now
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <SafeIcon 
              icon={isMenuOpen ? FiX : FiMenu} 
              className="text-2xl text-gray-700" 
            />
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <button className="text-primary-600 hover:text-primary-700 font-medium text-left">
                  Sign In
                </button>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;