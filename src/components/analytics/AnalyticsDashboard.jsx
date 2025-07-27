import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import EngagementChart from './EngagementChart';
import LearningProgressChart from './LearningProgressChart';
import UserBehaviorChart from './UserBehaviorChart';
import ConversionFunnel from './ConversionFunnel';
import { getAnalyticsData, trackEvent } from '../../utils/analytics';

const { FiTrendingUp, FiUsers, FiClock, FiTarget, FiBarChart3, FiPieChart, FiActivity, FiEye } = FiIcons;

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const data = getAnalyticsData();
    setAnalyticsData(data);
    trackEvent('analytics_dashboard_view', { tab: activeTab, timeRange });
  }, [activeTab, timeRange]);

  const getMetrics = () => {
    const now = new Date();
    const rangeMap = {
      '1d': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90
    };
    
    const daysBack = rangeMap[timeRange];
    const cutoffDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    const filteredData = analyticsData.filter(event => 
      new Date(event.properties.timestamp) > cutoffDate
    );

    const totalEvents = filteredData.length;
    const uniqueUsers = new Set(filteredData.map(e => e.properties.userId)).size;
    const avgSessionDuration = calculateAvgSessionDuration(filteredData);
    const conversionRate = calculateConversionRate(filteredData);

    return {
      totalEvents,
      uniqueUsers,
      avgSessionDuration,
      conversionRate,
      engagementRate: calculateEngagementRate(filteredData),
      courseCompletionRate: calculateCourseCompletionRate(filteredData)
    };
  };

  const calculateAvgSessionDuration = (data) => {
    const sessions = {};
    data.forEach(event => {
      const sessionId = event.properties.sessionId;
      if (!sessions[sessionId]) {
        sessions[sessionId] = { start: new Date(event.properties.timestamp), end: new Date(event.properties.timestamp) };
      } else {
        const eventTime = new Date(event.properties.timestamp);
        if (eventTime > sessions[sessionId].end) sessions[sessionId].end = eventTime;
      }
    });

    const durations = Object.values(sessions).map(session => 
      (session.end - session.start) / 1000 / 60
    );
    
    return durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
  };

  const calculateConversionRate = (data) => {
    const visitors = new Set(data.map(e => e.properties.userId)).size;
    const conversions = data.filter(e => e.name === 'course_enrollment').length;
    return visitors > 0 ? (conversions / visitors) * 100 : 0;
  };

  const calculateEngagementRate = (data) => {
    const engagementEvents = data.filter(e => 
      ['course_progress', 'user_engagement', 'video_play', 'quiz_attempt'].includes(e.name)
    ).length;
    return data.length > 0 ? (engagementEvents / data.length) * 100 : 0;
  };

  const calculateCourseCompletionRate = (data) => {
    const enrollments = data.filter(e => e.name === 'course_enrollment').length;
    const completions = data.filter(e => e.name === 'course_completion').length;
    return enrollments > 0 ? (completions / enrollments) * 100 : 0;
  };

  const metrics = getMetrics();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'engagement', label: 'Engagement', icon: FiActivity },
    { id: 'learning', label: 'Learning', icon: FiTarget },
    { id: 'conversion', label: 'Conversion', icon: FiTrendingUp }
  ];

  const metricCards = [
    {
      title: 'Total Events',
      value: metrics.totalEvents.toLocaleString(),
      change: '+12.5%',
      positive: true,
      icon: FiEye
    },
    {
      title: 'Active Users',
      value: metrics.uniqueUsers.toLocaleString(),
      change: '+8.2%',
      positive: true,
      icon: FiUsers
    },
    {
      title: 'Avg Session',
      value: `${Math.round(metrics.avgSessionDuration)}m`,
      change: '+15.3%',
      positive: true,
      icon: FiClock
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate.toFixed(1)}%`,
      change: '+3.1%',
      positive: true,
      icon: FiTarget
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into user behavior and course performance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center space-x-4 mt-4 lg:mt-0"
        >
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </motion.div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <SafeIcon icon={metric.icon} className="text-2xl text-primary-600" />
              <span className={`text-sm font-medium ${
                metric.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-gray-600 text-sm">{metric.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EngagementChart data={analyticsData} timeRange={timeRange} />
            <UserBehaviorChart data={analyticsData} timeRange={timeRange} />
          </div>
        )}

        {activeTab === 'engagement' && (
          <div className="space-y-8">
            <EngagementChart data={analyticsData} timeRange={timeRange} detailed={true} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Engagement Events</h3>
                <div className="space-y-3">
                  {['video_play', 'quiz_attempt', 'course_progress', 'resource_download'].map((event, index) => (
                    <div key={event} className="flex items-center justify-between">
                      <span className="text-gray-700 capitalize">{event.replace('_', ' ')}</span>
                      <span className="font-semibold text-primary-600">
                        {analyticsData.filter(e => e.name === event).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Engagement Rate</span>
                      <span>{metrics.engagementRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${metrics.engagementRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Course Completion</span>
                      <span>{metrics.courseCompletionRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${metrics.courseCompletionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="space-y-8">
            <LearningProgressChart data={analyticsData} timeRange={timeRange} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Progress</h3>
                <div className="space-y-3">
                  {['Module 1', 'Module 2', 'Module 3'].map((module, index) => (
                    <div key={module}>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{module}</span>
                        <span>{Math.floor(Math.random() * 40) + 60}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Patterns</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Peak Learning Hours</span>
                    <span className="font-semibold">2-4 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Avg Study Session</span>
                    <span className="font-semibold">25 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Most Active Day</span>
                    <span className="font-semibold">Tuesday</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Quiz Average</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Assignment Rate</span>
                    <span className="font-semibold text-blue-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Help Requests</span>
                    <span className="font-semibold text-orange-600">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conversion' && (
          <div className="space-y-8">
            <ConversionFunnel data={analyticsData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Sources</h3>
                <div className="space-y-3">
                  {[
                    { source: 'Organic Search', rate: '3.2%', color: 'bg-green-500' },
                    { source: 'Social Media', rate: '2.8%', color: 'bg-blue-500' },
                    { source: 'Email Campaign', rate: '4.1%', color: 'bg-purple-500' },
                    { source: 'Direct Traffic', rate: '2.1%', color: 'bg-orange-500' }
                  ].map((source) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                        <span className="text-gray-700">{source.source}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{source.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Opportunities</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="font-medium text-yellow-800">Landing Page</div>
                    <div className="text-sm text-yellow-700">Consider A/B testing the hero section</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-800">Email Sequence</div>
                    <div className="text-sm text-blue-700">Optimize follow-up timing</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800">Pricing Page</div>
                    <div className="text-sm text-green-700">Strong performance, maintain current strategy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;