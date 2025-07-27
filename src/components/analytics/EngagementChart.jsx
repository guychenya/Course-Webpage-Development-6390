import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const EngagementChart = ({ data, timeRange, detailed = false }) => {
  const chartData = useMemo(() => {
    const now = new Date();
    const rangeMap = { '1d': 1, '7d': 7, '30d': 30, '90d': 90 };
    const daysBack = rangeMap[timeRange];
    const cutoffDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    const filteredData = data.filter(event => 
      new Date(event.properties.timestamp) > cutoffDate
    );

    // Group by day and event type
    const dailyEngagement = {};
    const eventTypes = ['course_progress', 'user_engagement', 'video_play', 'quiz_attempt'];
    
    // Initialize days
    for (let i = 0; i < daysBack; i++) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const dateStr = date.toISOString().split('T')[0];
      dailyEngagement[dateStr] = { total: 0, ...Object.fromEntries(eventTypes.map(type => [type, 0])) };
    }

    // Count events
    filteredData.forEach(event => {
      const dateStr = new Date(event.properties.timestamp).toISOString().split('T')[0];
      if (dailyEngagement[dateStr]) {
        dailyEngagement[dateStr].total++;
        if (eventTypes.includes(event.name)) {
          dailyEngagement[dateStr][event.name]++;
        }
      }
    });

    const dates = Object.keys(dailyEngagement).sort();
    const totalEngagement = dates.map(date => dailyEngagement[date].total);
    
    const series = detailed ? eventTypes.map(type => ({
      name: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      type: 'line',
      data: dates.map(date => dailyEngagement[date][type]),
      smooth: true,
      symbol: 'circle',
      symbolSize: 6
    })) : [{
      name: 'Total Engagement',
      type: 'line',
      data: totalEngagement,
      smooth: true,
      areaStyle: {
        opacity: 0.3
      },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#0284c7'
      }
    }];

    return {
      dates: dates.map(date => new Date(date).toLocaleDateString()),
      series
    };
  }, [data, timeRange, detailed]);

  const option = {
    title: {
      text: detailed ? 'Detailed Engagement Analytics' : 'User Engagement Over Time',
      left: 'left',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: {
        color: '#374151'
      }
    },
    legend: {
      top: 30,
      textStyle: {
        color: '#6b7280'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: detailed ? '15%' : '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.dates,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6'
        }
      }
    },
    series: chartData.series
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
        style={{ height: detailed ? '500px' : '400px' }}
        opts={{ renderer: 'svg' }}
      />
    </motion.div>
  );
};

export default EngagementChart;