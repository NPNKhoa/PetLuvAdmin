import React, { useState, useMemo } from 'react';
import PieChart from '../common/PieChart';
import BarChart from '../common/BarChart';
import { CircularProgress, MenuItem, Select } from '@mui/material';
import { FiInfo, FiBarChart2, FiPieChart, FiFilter } from 'react-icons/fi';

const BreedRatioStatistic = ({
  loading,
  data,
  labels,
  title,
  validPetTypes,
  petType,
  handleChangePetType,
}) => {
  const [chartType, setChartType] = useState('pie');

  const toggleChartType = () => {
    setChartType(chartType === 'pie' ? 'bar' : 'pie');
  };

  // Calculate total for percentage display
  const total = Array.isArray(data)
    ? data.reduce((sum, value) => sum + value, 0)
    : 0;

  const pieOptions = useMemo(
    () => ({
      plugins: {
        title: {
          display: true,
          text: title,
          color: '#f79400',
          font: { size: 20 },
        },
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              return `${tooltipItem.label}: ${value} %`;
            },
          },
        },
      },
    }),
    [title]
  );

  const barOptions = useMemo(
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
            label: function (context) {
              const value = context.raw;
              return `${context.dataset.label}: ${value} %`;
            },
          },
        },
      },
    }),
    [title]
  );

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-100'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center'>
          <h2 className='text-xl font-bold text-primary'>
            {title || 'Thống kê tỷ lệ giống thú cưng'}
          </h2>
          <div className='relative group ml-2'>
            <button className='text-gray-500 hover:text-primary transition-colors'>
              <FiInfo size={18} />
            </button>
            <div className='absolute left-0 top-full mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10'>
              Thống kê tỷ lệ các giống thú cưng theo loài
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <button
            onClick={toggleChartType}
            className='p-2 rounded-full hover:bg-gray-100 text-primary transition-colors'
            title={
              chartType === 'pie'
                ? 'Chuyển sang biểu đồ cột'
                : 'Chuyển sang biểu đồ tròn'
            }
          >
            {chartType === 'pie' ? (
              <FiBarChart2 size={20} />
            ) : (
              <FiPieChart size={20} />
            )}
          </button>
        </div>
      </div>

      <div className='flex items-center justify-start gap-2 mb-6 bg-gray-50 p-3 rounded-lg'>
        <div className='flex items-center text-secondary'>
          <FiFilter size={18} className='mr-2' />
          <h3 className='text-lg font-semibold'>Thống kê theo loài:</h3>
        </div>
        <Select
          size='small'
          label='Loài'
          value={petType}
          onChange={handleChangePetType}
          className='min-w-[150px]'
        >
          {validPetTypes?.map((item) => (
            <MenuItem key={item?.value} value={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Summary card */}
      {!loading && Array.isArray(data) && data.length > 0 && (
        <div className='mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-indigo-100'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='text-sm font-medium text-secondary-light mb-1'>
                Tổng số giống
              </h3>
              <p className='text-xl font-bold text-primary'>
                {labels.length} giống
              </p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-secondary-light mb-1'>
                Giống phổ biến nhất
              </h3>
              <p className='text-xl font-bold text-primary'>
                {labels[data.indexOf(Math.max(...data).toString())] ||
                  labels[0]}
              </p>
              <p className='text-sm text-primary'>
                Chiếm tỉ lệ: {Math.max(...data)} %
              </p>
            </div>
          </div>
        </div>
      )}

      <div className='min-h-[400px] flex justify-center items-center'>
        {loading ? (
          <div className='flex flex-col items-center my-16'>
            <CircularProgress size={'4rem'} />
            <p className='mt-4 text-gray-600'>Đang tải dữ liệu...</p>
          </div>
        ) : Array.isArray(data) && data?.length > 0 ? (
          <div className='w-[60%]'>
            {chartType === 'pie' ? (
              <PieChart
                data={data}
                labels={labels}
                title={title || 'Thống kê tỷ lệ giống thú cưng'}
                options={pieOptions}
              />
            ) : (
              <BarChart
                data={data}
                labels={labels}
                title={title || 'Thống kê tỷ lệ giống thú cưng'}
                datasetLabel='Số lượng'
                orientation='horizontal'
                options={barOptions}
              />
            )}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-xl text-primary font-semibold'>
              Không có dữ liệu
            </p>
            <p className='text-gray-500 mt-2'>
              Không có thông tin về tỷ lệ giống thú cưng cho loài này
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedRatioStatistic;
