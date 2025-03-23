import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const SelectDateRange = ({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='flex space-x-4'>
        <DatePicker
          label='Ngày bắt đầu'
          value={startDate}
          onChange={onChangeStart}
          renderInput={(params) => <TextField {...params} size='small' />}
        />

        <DatePicker
          label='Ngày kết thúc'
          value={endDate}
          onChange={onChangeEnd}
          renderInput={(params) => <TextField {...params} size='small' />}
        />
      </div>
    </LocalizationProvider>
  );
};

export default SelectDateRange;
