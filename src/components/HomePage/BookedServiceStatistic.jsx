import BarChart from '../common/BarChart';
import { CircularProgress, MenuItem, Select } from '@mui/material';

const BookedServiceStatistic = ({
  loading,
  data,
  labels,
  title,
  validRatioTypes,
  ratioType,
  handleChangeRatioType,
}) => {
  return (
    <div>
      <div className='flex items-center justify-start gap-2 mb-6'>
        <h2 className='text-lg text-secondary font-semibold'>Loại thống kê</h2>
        <Select
          size='small'
          label='Thời gian'
          value={ratioType}
          onChange={handleChangeRatioType}
        >
          {validRatioTypes?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </div>
      {loading ? (
        <div className='w-full h-full my-16 flex justify-center items-center'>
          <CircularProgress size={'4rem'} />
        </div>
      ) : Array.isArray(data) && data?.length > 0 ? (
        <BarChart
          data={data}
          labels={labels}
          title={title || 'Bar Chart'}
          datasetLabel='Số lần đặt'
          orientation='horizontal'
          division={1}
        />
      ) : (
        <p className='text-xl text-primary font-semibold text-center'>
          Không có dữ liệu
        </p>
      )}
    </div>
  );
};

export default BookedServiceStatistic;
