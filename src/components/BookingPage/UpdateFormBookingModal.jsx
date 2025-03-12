import { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import CustomModal from '../common/CustomModal';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateBooking } from '../../redux/thunks/bookingThunk';
import formatCurrency from '../../utils/formatCurrency';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const UpdateBookingFormModal = ({ open, onClose, booking }) => {
  const dispatch = useDispatch();

  const bookingStatuses = useSelector(
    (state) => state.bookingStatuses.bookingStatuses
  );
  const paymentStatuses = useSelector(
    (state) => state.paymentStatuses.paymentStatuses
  );

  const formik = useFormik({
    initialValues: {
      bookingStatusId: booking?.bookingStatusId || '',
      paymentStatusId: booking?.paymentStatusId || '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const {
        bookingStartTime,
        bookingEndTime,
        roomRentalTime,
        totalEstimateTime,
        paymentStatusId,
        bookingStatusId,
      } = booking;

      const updatedBooking = {
        bookingStartTime,
        bookingEndTime,
        roomRentalTime,
        totalEstimateTime,
        paymentStatusId,
        bookingStatusId,
        ...values,
      };

      dispatch(
        updateBooking({
          bookingId: booking.bookingId,
          payload: updatedBooking,
        })
      )
        .unwrap()
        .then(() => {
          toast.success('Cập nhật đặt lịch thành công');
          onClose();
        })
        .catch((e) => {
          toast.error(e);
          onClose();
        });
    },
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Cập nhật đặt lịch'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      <div className='grid grid-cols-2 gap-4 p-4'>
        <p className='text-left'>
          <strong>ID Đặt lịch:</strong>
        </p>
        <p className='text-left'>{booking?.bookingId}</p>

        <p className='text-left'>
          <strong>Thời gian bắt đầu:</strong>
        </p>
        <p className='text-left'>
          {dayjs(booking?.bookingStartTime).format('DD/MM/YYYY HH:mm:ss')}
        </p>

        <p className='text-left'>
          <strong>Thời gian kết thúc:</strong>
        </p>
        <p className='text-left'>
          {dayjs(booking?.bookingEndTime).format('DD/MM/YYYY HH:mm:ss')}
        </p>

        <p className='text-left'>
          <strong>Ghi chú:</strong>
        </p>
        <p className='text-left'>{booking?.bookingNote}</p>

        <p className='text-left'>
          <strong>Tổng tiền:</strong>
        </p>
        <p className='text-left'>{formatCurrency(booking?.totalAmount)}</p>

        <p className='text-left'>
          <strong>Tiền cọc:</strong>
        </p>
        <p className='text-left'>{formatCurrency(booking?.depositAmount)}</p>

        <p className='text-left'>
          <strong>Thời gian ước tính:</strong>
        </p>
        <p className='text-left'>{booking?.totalEstimateTime} tiếng</p>

        <p className='text-left'>
          <strong>Loại đặt lịch:</strong>
        </p>
        <p className='text-left'>{booking?.bookingType?.bookingTypeName}</p>

        <p className='text-left'>
          <strong>Trạng thái đặt lịch:</strong>
        </p>
        <TextField
          select
          fullWidth
          {...formik.getFieldProps('bookingStatusId')}
        >
          {bookingStatuses.map((status) => (
            <MenuItem
              key={status.bookingStatusId}
              value={status.bookingStatusId}
            >
              {status.bookingStatusName}
            </MenuItem>
          ))}
        </TextField>

        <p className='text-left'>
          <strong>Trạng thái thanh toán:</strong>
        </p>
        <TextField
          select
          fullWidth
          {...formik.getFieldProps('paymentStatusId')}
        >
          {paymentStatuses.map((status) => (
            <MenuItem
              key={status.paymentStatusId}
              value={status.paymentStatusId}
            >
              {status.paymentStatusName}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </CustomModal>
  );
};

export default UpdateBookingFormModal;
