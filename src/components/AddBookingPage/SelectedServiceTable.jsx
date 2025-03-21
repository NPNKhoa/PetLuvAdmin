import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';
import { useCallback } from 'react';

const SelectedServiceTable = ({ selectedItems }) => {
  const getTotalAmount = useCallback(() => {
    let result = 0;

    Array.isArray(selectedItems) &&
      selectedItems.length !== 0 &&
      selectedItems.forEach((item) => {
        result += item?.price;
      });

    return result;
  }, [selectedItems]);

  return (
    <TableContainer component={Paper} className='p-4 mt-4 rounded-xl'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold mb-3'>Dịch vụ đã chọn</h2>
        <p>
          <span className='text-primary text-lg font-semibold'>
            Tổng tiền:{' '}
          </span>
          {' ' + formatCurrency(getTotalAmount())}
        </p>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên dịch vụ</TableCell>
            <TableCell>Giống</TableCell>
            <TableCell>Khoảng cân nặng</TableCell>
            <TableCell>Giá tiền</TableCell>
            <TableCell>Thời gian dự kiến</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedItems?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.serviceName}</TableCell>
              <TableCell>{item.breedName}</TableCell>
              <TableCell>{item.petWeightRange}</TableCell>
              <TableCell>{formatCurrency(item?.price)}</TableCell>
              <TableCell>{item.estimateTime} giờ</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectedServiceTable;
