import PieChart from '../common/PieChart';
import { CircularProgress, MenuItem, Select } from '@mui/material';
import { useMemo } from 'react';

const BreedRatioStatistic = ({
  loading,
  data,
  labels,
  title,
  validPetTypes,
  petType,
  handleChangePetType,
}) => {
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
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.raw} %`;
            },
          },
        },
      },
    }),
    [title]
  );

  return (
    <div>
      <div className='flex items-center justify-start gap-2 mb-6'>
        <h2 className='text-lg text-secondary font-semibold'>
          Thống kê theo loài
        </h2>
        <Select
          size='small'
          label='Loài'
          value={petType}
          onChange={handleChangePetType}
        >
          {validPetTypes?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </div>
      {loading ? (
        <div className='w-full h-full my-16 flex justify-center items-center'>
          <CircularProgress size={'4rem'} />
        </div>
      ) : Array.isArray(data) && data?.length > 0 ? (
        <PieChart
          data={data}
          labels={labels}
          title={title || 'Pie Chart'}
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

export default BreedRatioStatistic;
