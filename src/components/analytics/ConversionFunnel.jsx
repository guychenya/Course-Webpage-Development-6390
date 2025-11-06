import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const ConversionFunnel = ({ data }) => {
  const chartData = useMemo(() => {
    // Simulate conversion funnel data
    const funnelData = [
      { name: 'Website Visitors', value: 10000, conversion: 100 },
      { name: 'Landing Page Views', value: 7500, conversion: 75 },
      { name: 'Course Page Views', value: 3200, conversion: 32 },
      { name: 'Pricing Page Views', value: 1800, conversion: 18 },
      { name: 'Enrollment Attempts', value: 850, conversion: 8.5 },
      { name: 'Successful Enrollments', value: 420, conversion: 4.2 }
    ];

    return funnelData;
  }, [data]);

  const option = {
    title: {
      text: 'Conversion Funnel Analysis',
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
      formatter: function(params) {
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
            <div>Users: ${params.value.toLocaleString()}</div>
            <div>Conversion Rate: ${params.data.conversion}%</div>
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
    series: [{
      name: 'Users',
      type: 'bar',
      data: chartData.map(item => ({
        value: item.value,
        conversion: item.conversion,
        itemStyle: {
          color: function(params) {
            const colors = ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [4, 4, 0, 0]
        }
      })),
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

export default ConversionFunnel;