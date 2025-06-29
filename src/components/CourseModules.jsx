import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiPlay, FiFileText, FiUsers, FiTrendingUp } = FiIcons;

const CourseModules = () => {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      id: 1,
      title: 'Digital Marketing Strategy',
      description: 'Develop comprehensive digital marketing strategies that drive results and ROI.',
      icon: FiTrendingUp,
      lessons: [
        {
          title: 'Market Research and Analysis',
          description: 'Learn to identify target audiences and analyze market opportunities.',
          concepts: [
            'Customer personas',
            'Market segmentation', 
            'Competitive analysis',
            'SWOT analysis'
          ],
          activities: [
            'Create detailed customer personas',
            'Competitive analysis worksheet',
            'Market opportunity assessment',
            'Apply concepts in real scenario'
          ]
        },
        {
          title: 'Content Marketing Fundamentals',
          description: 'Master the art of creating engaging content that converts prospects into customers.',
          concepts: [
            'Content strategy',
            'Storytelling techniques',
            'Content calendar planning',
            'Performance metrics'
          ],
          activities: [
            'Develop content strategy document',
            'Create 30-day content calendar',
            'Write compelling blog posts',
            'Apply concepts in real scenario'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Capstone Project & Portfolio',
      description: 'Apply all learned concepts in a comprehensive project that demonstrates mastery.',
      icon: FiUsers,
      lessons: [
        {
          title: 'Project Planning and Design',
          description: 'Plan and design a comprehensive project that showcases your new skills.',
          concepts: [
            'Project planning',
            'Requirements gathering',
            'Design thinking',
            'Success metrics'
          ],
          activities: [
            'Create project proposal',
            'Design project architecture',
            'Set project milestones'
          ]
        },
        {
          title: 'Implementation and Presentation',
          description: 'Build your project and prepare a professional presentation of your work.',
          concepts: [
            'Implementation best practices',
            'Testing and debugging',
            'Documentation',
            'Presentation skills'
          ],
          activities: [
            'Complete capstone project',
            'Create project documentation',
            'Present to peers/instructors'
          ]
        }
      ]
    }
  ];

  return (
    <section id="modules" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Course Modules
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured learning path that takes you from beginner to expert 
            through hands-on projects and real-world applications.
          </p>
        </motion.div>

        <div className="space-y-8">
          {modules.map((module, moduleIndex) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: moduleIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <SafeIcon 
                      icon={module.icon} 
                      className="text-3xl text-primary-600" 
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Module {module.id}: {module.title}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <SafeIcon 
                    icon={FiChevronDown} 
                    className={`text-2xl text-gray-500 transition-transform duration-200 ${
                      activeModule === moduleIndex ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {activeModule === moduleIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6 space-y-8">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="bg-white rounded-xl p-6">
                          <div className="flex items-start space-x-4 mb-6">
                            <SafeIcon 
                              icon={FiPlay} 
                              className="text-xl text-primary-600 mt-1" 
                            />
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">
                                Lesson {moduleIndex + 1}.{lessonIndex + 1}: {lesson.title}
                              </h4>
                              <p className="text-gray-600">
                                {lesson.description}
                              </p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <SafeIcon icon={FiFileText} className="mr-2" />
                                Key Concepts
                              </h5>
                              <ul className="space-y-2">
                                {lesson.concepts.map((concept, index) => (
                                  <li key={index} className="text-gray-600 flex items-center">
                                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                                    {concept}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <SafeIcon icon={FiUsers} className="mr-2" />
                                Activities
                              </h5>
                              <ul className="space-y-2">
                                {lesson.activities.map((activity, index) => (
                                  <li key={index} className="text-gray-600 flex items-center">
                                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseModules;