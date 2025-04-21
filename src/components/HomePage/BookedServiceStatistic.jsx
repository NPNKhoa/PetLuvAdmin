import React, { useState } from 'react';
import BarChart from '../common/BarChart';
import PieChart from '../common/PieChart';
import { CircularProgress, MenuItem, Select } from '@mui/material';
import { FiInfo, FiBarChart2, FiPieChart } from 'react-icons/fi';

const BookedServiceStatistic = ({
  loading,
  data,
  labels,
  title,
  validRatioTypes,
  ratioType,
  handleChangeRatioType,
}) => {
  console.log(data);
  const [chartType, setChartType] = useState('bar');

  const toggleChartType = () => {
    setChartType(chartType === 'bar' ? 'pie' : 'bar');
  };

  // Calculate total for percentage display
  const total = Array.isArray(data)
    ? data.reduce((sum, value) => sum + value, 0)
    : 0;

  // Format data with percentages if needed
  const formattedLabels = Array.isArray(labels)
    ? labels.map((label, index) => {
        if (total > 0) {
          const percentage = ((data[index] / total) * 100).toFixed(1);
          return `${label} (${percentage}%)`;
        }
        return label;
      })
    : [];

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-100'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center'>
          <h2 className='text-xl font-bold text-primary'>
            {title || 'Thống kê dịch vụ đã đặt'}
          </h2>
          <div className='relative group ml-2'>
            <button className='text-gray-500 hover:text-primary transition-colors'>
              <FiInfo size={16} />
            </button>
            <div className='absolute left-0 top-full mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10'>
              Thống kê số lượng dịch vụ được đặt theo các tiêu chí khác nhau
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <button
            onClick={toggleChartType}
            className='p-2 rounded-full hover:bg-gray-100 text-primary transition-colors'
            title={
              chartType === 'bar'
                ? 'Chuyển sang biểu đồ tròn'
                : 'Chuyển sang biểu đồ cột'
            }
          >
            {chartType === 'bar' ? (
              <FiPieChart size={20} />
            ) : (
              <FiBarChart2 size={20} />
            )}
          </button>
        </div>
      </div>

      <div className='flex items-center gap-3 mb-6'>
        <h3 className='text-lg text-secondary font-semibold'>Loại thống kê:</h3>
        <Select
          size='small'
          label='Thời gian'
          value={ratioType}
          onChange={handleChangeRatioType}
          className='min-w-[200px]'
        >
          {validRatioTypes?.map((item) => (
            <MenuItem key={item?.value} value={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className='min-h-[400px] flex justify-center items-center'>
        {loading ? (
          <div className='flex flex-col items-center my-16'>
            <CircularProgress size={'4rem'} />
            <p className='mt-4 text-gray-600'>Đang tải dữ liệu...</p>
          </div>
        ) : Array.isArray(data) && data?.length > 0 ? (
          <div className='w-full'>
            {chartType === 'bar' ? (
              <BarChart
                data={data}
                labels={formattedLabels}
                title={title || 'Thống kê dịch vụ đã đặt'}
                datasetLabel='Số lần đặt'
                orientation='horizontal'
                unitY=''
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const value = context.raw;
                          const percentage =
                            total > 0
                              ? ((value / total) * 100).toFixed(1) + '%'
                              : '0%';
                          return `${context.dataset.label}: ${value} (${percentage})`;
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <PieChart
                data={data}
                labels={formattedLabels}
                title={title || 'Thống kê dịch vụ đã đặt'}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const value = context.raw;
                          const percentage =
                            total > 0
                              ? ((value / total) * 100).toFixed(1) + '%'
                              : '0%';
                          return `${context.label}: ${value} (${percentage})`;
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-xl text-primary font-semibold'>
              Không có dữ liệu
            </p>
            <p className='text-gray-500 mt-2'>
              Vui lòng thử chọn loại thống kê khác hoặc kiểm tra lại dữ liệu
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedServiceStatistic;
