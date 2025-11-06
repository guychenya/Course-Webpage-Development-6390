import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const LearningProgressChart = ({ data, timeRange }) => {
  const chartData = useMemo(() => {
    // Simulate module progress data
    const modules = [
      { name: 'Digital Strategy', progress: 85, students: 120 },
      { name: 'Google Ads', progress: 72, students: 98 },
      { name: 'Email Marketing', progress: 91, students: 87 },
      { name: 'Social Media', progress: 68, students: 105 },
      { name: 'Analytics', progress: 45, students: 76 },
      { name: 'Conversion Opt.', progress: 23, students: 34 }
    ];

    return modules;
  }, [data, timeRange]);

  const option = {
    title: {
      text: 'Learning Progress by Module',
      left: 'left',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: {
        color: '#374151'
      },
      formatter: function(params) {
        const data = params[0];
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${data.name}</div>
            <div>Average Progress: ${data.value}%</div>
            <div>Active Students: ${chartData[data.dataIndex].students}</div>
          </div>
        `;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280',
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280',
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6'
        }
      }
    },
    series: [{
      name: 'Progress',
      type: 'bar',
      data: chartData.map(item => item.progress),
      itemStyle: {
        color: function(params) {
          const colors = ['#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#052e16'];
          return colors[params.dataIndex % colors.length];
        },
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.2)'
        }
      }
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

export default LearningProgressChart;