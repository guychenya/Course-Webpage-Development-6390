import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const UserBehaviorChart = ({ data, timeRange }) => {
  const chartData = useMemo(() => {
    // Simulate user behavior data
    const behaviorData = [
      { name: 'Page Views', value: 3420, color: '#0284c7' },
      { name: 'Video Watch Time', value: 2180, color: '#f59e0b' },
      { name: 'Quiz Attempts', value: 892, color: '#10b981' },
      { name: 'Resource Downloads', value: 567, color: '#8b5cf6' },
      { name: 'Forum Posts', value: 234, color: '#ef4444' },
      { name: 'Assignment Submissions', value: 189, color: '#06b6d4' }
    ];

    return behaviorData;
  }, [data, timeRange]);

  const option = {
    title: {
      text: 'User Behavior Patterns',
      left: 'left',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: {
        color: '#374151'
      },
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      textStyle: {
        color: '#6b7280'
      }
    },
    series: [{
      name: 'User Behavior',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold',
          color: '#1f2937'
        }
      },
      labelLine: {
        show: false
      },
      data: chartData
    }]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <ReactECharts 
        option={option} 
        style={{ height: '400px' }}
        opts={{ renderer: 'svg' }}
      />
    </motion.div>
  );
};

export default UserBehaviorChart;