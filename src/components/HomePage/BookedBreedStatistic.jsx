import BarChart from '../common/BarChart';
import { CircularProgress } from '@mui/material';

const BookedBreedStatistic = ({ loading, data, labels, title }) => {
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

export default BookedBreedStatistic;
