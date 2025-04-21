import React, { useState, useMemo } from 'react';
import BarChart from '../common/BarChart';
import LineChart from '../common/LineChart';
import { CircularProgress } from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';
import dayjs from 'dayjs';
import {
  FiInfo,
  FiBarChart2,
  FiTrendingUp,
  FiCalendar,
  FiTrendingDown,
} from 'react-icons/fi';

const RevenueStatistic = ({
  loading,
  data,
  labels,
  typeOfStatisticTime,
  title,
}) => {
  const [chartType, setChartType] = useState('bar');

  const toggleChartType = () => {
    setChartType(chartType === 'bar' ? 'line' : 'bar');
  };

  // Calculate total revenue
  const totalRevenue = Array.isArray(data)
    ? data.reduce((sum, value) => sum + value, 0)
    : 0;

  // Format total revenue
  const formattedTotalRevenue = formatCurrency(totalRevenue);

  // Find highest revenue period
  const highestRevenue =
    Array.isArray(data) && data.length > 0 ? Math.max(...data) : 0;

  const highestRevenueIndex = data.indexOf(highestRevenue);
  const highestRevenueLabel =
    highestRevenueIndex !== -1 && labels[highestRevenueIndex]
      ? typeOfStatisticTime === 'year'
        ? `Tháng ${labels[highestRevenueIndex]}`
        : `Ngày ${dayjs(labels[highestRevenueIndex]).format('DD/MM/YYYY')}`
      : 'Không xác định';

  // Find lowest revenue period (excluding zeros)
  const nonZeroData = data.filter((value) => value > 0);
  const lowestRevenue = nonZeroData.length > 0 ? Math.min(...nonZeroData) : 0;
  const lowestRevenueIndex = data.indexOf(lowestRevenue);
  const lowestRevenueLabel =
    lowestRevenueIndex !== -1 && labels[lowestRevenueIndex]
      ? typeOfStatisticTime === 'year'
        ? `Tháng ${labels[lowestRevenueIndex]}`
        : `Ngày ${dayjs(labels[lowestRevenueIndex]).format('DD/MM/YYYY')}`
      : 'Không xác định';

  const options = useMemo(
    () => ({
      plugins: {
        title: {
          display: true,
          text: title,
          color: '#f79400',
          font: { size: 20 },
        },
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            title: function (tooltipItems) {
              const index = tooltipItems[0].dataIndex;
              return typeOfStatisticTime === 'year'
                ? `Tháng ${labels[index]}`
                : `Ngày ${dayjs(labels[index]).format('DD/MM/YYYY')}`;
            },
            label: function (tooltipItem) {
              return `${formatCurrency(tooltipItem.raw)}`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: false,
          ticks: {
            callback: function (_, index) {
              return typeOfStatisticTime === 'year'
                ? `Tháng ${labels[index]}`
                : typeOfStatisticTime === 'month'
                ? `Ngày ${dayjs(labels[index]).date()}`
                : `Ngày ${dayjs(labels[index]).format('DD/MM/YYYY')}`;
            },
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...data) * 1.2,
          ticks: {
            stepSize: Math.ceil(Math.max(...data) / 5),
            callback: function (value) {
              return `${formatCurrency(value)}`.trim();
            },
          },
        },
      },
    }),
    [data, labels, title, typeOfStatisticTime]
  );

  const lineOptions = useMemo(
    () => ({
      plugins: {
        title: {
          display: true,
          text: title,
          color: '#f79400',
          font: { size: 20 },
        },
        tooltip: {
          callbacks: {
            title: function (tooltipItems) {
              const index = tooltipItems[0].dataIndex;
              return typeOfStatisticTime === 'year'
                ? `Tháng ${labels[index]}`
                : `Ngày ${dayjs(labels[index]).format('DD/MM/YYYY')}`;
            },
            label: function (tooltipItem) {
              return `${formatCurrency(tooltipItem.raw)}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback: function (_, index) {
              return typeOfStatisticTime === 'year'
                ? `Tháng ${labels[index]}`
                : typeOfStatisticTime === 'month'
                ? `Ngày ${dayjs(labels[index]).day()}`
                : `${dayjs(labels[index]).format('DD/MM')}`;
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return `${formatCurrency(value)}`.trim();
            },
          },
        },
      },
    }),
    [labels, title, typeOfStatisticTime]
  );

  // Format labels for line chart to be more compact
  const lineLabels = labels.map((label) =>
    typeOfStatisticTime === 'year'
      ? `${label}`
      : `${dayjs(label).format('DD/MM')}`
  );

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-100'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center'>
          <h2 className='text-xl font-bold text-primary'>
            {title || 'Thống kê doanh thu'}
          </h2>
          <div className='relative group ml-2'>
            <button className='text-gray-500 hover:text-primary transition-colors'>
              <FiInfo size={18} />
            </button>
            <div className='absolute left-0 top-full mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10'>
              Thống kê doanh thu theo{' '}
              {typeOfStatisticTime === 'year' ? 'tháng' : 'ngày'}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <button
            onClick={toggleChartType}
            className='p-2 rounded-full hover:bg-gray-100 text-primary transition-colors'
            title={
              chartType === 'bar'
                ? 'Chuyển sang biểu đồ đường'
                : 'Chuyển sang biểu đồ cột'
            }
          >
            {chartType === 'bar' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M3 3v18h18'></path>
                <path d='M3 12h4l3-9 4 18 3-9h4'></path>
              </svg>
            ) : (
              <FiBarChart2 size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200'>
          <div className='flex items-center gap-3'>
            <div className='bg-blue-500 text-white p-3 rounded-full'>
              <FiTrendingUp size={24} />
            </div>
            <div>
              <h3 className='text-sm font-medium text-blue-700'>
                Tổng doanh thu
              </h3>
              <p className='text-xl font-bold text-blue-900'>
                {formattedTotalRevenue}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200'>
          <div className='flex items-center gap-3'>
            <div className='bg-green-500 text-white p-3 rounded-full'>
              <FiTrendingUp size={24} />
            </div>
            <div>
              <h3 className='text-sm font-medium text-green-700'>
                Doanh thu cao nhất
              </h3>
              <p className='text-xl font-bold text-green-900'>
                {formatCurrency(highestRevenue)}
              </p>
              <p className='text-xs text-green-700'>{highestRevenueLabel}</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200'>
          <div className='flex items-center gap-3'>
            <div className='bg-amber-500 text-white p-3 rounded-full'>
              <FiTrendingDown size={24} />
            </div>
            <div>
              <h3 className='text-sm font-medium text-amber-700'>
                Doanh thu thấp nhất
              </h3>
              <p className='text-xl font-bold text-amber-900'>
                {formatCurrency(lowestRevenue)}
              </p>
              <p className='text-xs text-amber-700'>{lowestRevenueLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='min-h-[400px] flex justify-center items-center'>
        {loading ? (
          <div className='flex flex-col items-center my-16'>
            <CircularProgress size={'4rem'} />
            <p className='mt-4 text-gray-600'>Đang tải dữ liệu doanh thu...</p>
          </div>
        ) : Array.isArray(data) && data?.length > 0 ? (
          <div className='w-full'>
            {chartType === 'bar' ? (
              <BarChart
                data={data}
                labels={labels}
                title={title || 'Thống kê doanh thu'}
                datasetLabel='Doanh thu'
                unitX='Tháng'
                unitY='đồng'
                orientation='vertical'
                options={options}
              />
            ) : (
              <LineChart
                data={data}
                labels={lineLabels}
                title={title || 'Thống kê doanh thu'}
                datasetLabel='Doanh thu'
                unitX=''
                unitY='đồng'
                options={lineOptions}
                tension={0.3}
                fill={true}
                pointRadius={4}
              />
            )}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-xl text-primary font-semibold'>
              Không có dữ liệu
            </p>
            <p className='text-gray-500 mt-2'>
              Không có thông tin về doanh thu trong khoảng thời gian này
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueStatistic;
