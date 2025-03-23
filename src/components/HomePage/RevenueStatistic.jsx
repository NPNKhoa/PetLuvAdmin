import BarChart from '../common/BarChart';
import { CircularProgress } from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const RevenueStatistic = ({
  loading,
  data,
  labels,
  typeOfStatisticTime,
  title,
}) => {
  console.log(typeOfStatisticTime);
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
                ? `Ngày ${dayjs(labels[index]).day()}`
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

  return (
    <div>
      {loading ? (
        <div className='w-full h-full my-16 flex justify-center items-center'>
          <CircularProgress size={'4rem'} />
        </div>
      ) : Array.isArray(data) && data?.length > 0 ? (
        <BarChart
          data={data}
          labels={labels}
          title={title || 'Bar Chart'}
          datasetLabel='Doanh thu'
          unitX='Tháng'
          unitY='đồng'
          orientation='vertical'
          options={options}
        />
      ) : (
        <p className='text-xl text-primary font-semibold text-center'>
          Không có dữ liệu
        </p>
      )}
    </div>
  );
};

export default RevenueStatistic;
