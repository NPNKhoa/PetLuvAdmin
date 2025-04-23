import { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import CustomModal from '../common/CustomModal';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBookings, updateBooking } from '../../redux/thunks/bookingThunk';
import formatCurrency from '../../utils/formatCurrency';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  CalendarToday,
  AccessTime,
  Notes,
  AttachMoney,
  Payment,
  Category,
  Update,
} from '@mui/icons-material';
import { GrSchedule } from 'react-icons/gr';

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
          toast.success('Cập nhật lịch hẹn thành công');
          dispatch(getBookings());
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
      title='Cập nhật lịch hẹn'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      <div className='p-5 bg-gray-100 rounded-xl shadow-sm'>
        <div className='font-cute text-primary tracking-wide mb-4 text-xl flex items-center'>
          <Update className='mr-2' />
          <span>Cập nhật trạng thái</span>
        </div>

        <div className='flex flex-wrap -mx-3'>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <p className='text-sm font-medium text-gray-600 mb-2'>
              Trạng thái lịch hẹn
            </p>
            <TextField
              select
              fullWidth
              variant='outlined'
              {...formik.getFieldProps('bookingStatusId')}
              className='bg-white'
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
          </div>

          <div className='w-full md:w-1/2 px-3 mb-4'>
            <p className='text-sm font-medium text-gray-600 mb-2'>
              Trạng thái thanh toán
            </p>
            <TextField
              select
              fullWidth
              variant='outlined'
              {...formik.getFieldProps('paymentStatusId')}
              className='bg-white'
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
        </div>
      </div>

      <div className='p-6'>
        <div className='p-5 mb-4 bg-gray-100 rounded-xl shadow-sm'>
          <div className='font-cute text-primary tracking-wide mb-8 text-2xl text-center flex items-center justify-center'>
            <span>Thông tin lịch hẹn</span>
          </div>

          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-3/5 px-3 mb-4'>
              <div className='space-y-4'>
                <div className='flex items-start space-x-2'>
                  <CalendarToday
                    className='text-primary mt-1'
                    fontSize='small'
                  />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      ID Lịch hẹn
                    </p>
                    <p className='font-semibold'>{booking?.bookingId}</p>
                  </div>
                </div>

                <div className='flex items-start space-x-2'>
                  <GrSchedule className='text-primary mt-1' fontSize='small' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Thời gian bắt đầu
                    </p>
                    <p className='font-semibold'>
                      {dayjs(booking?.bookingStartTime).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-2'>
                  <GrSchedule className='text-primary mt-1' fontSize='small' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Thời gian kết thúc
                    </p>
                    <p className='font-semibold'>
                      {dayjs(booking?.bookingEndTime).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-2'>
                  <Notes className='text-primary mt-1' fontSize='small' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>Ghi chú</p>
                    <p className='font-semibold'>
                      {booking?.bookingNote || 'Không có ghi chú'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full md:w-2/5 px-3 mb-4'>
              <div className='space-y-4'>
                <div className='flex items-start space-x-2'>
                  <AttachMoney className='text-primary mt-1' fontSize='small' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Tổng tiền
                    </p>
                    <p className='font-semibold text-primary'>
                      {formatCurrency(booking?.totalAmount)}
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-2'>
                  <Payment className='text-primary mt-1' fontSize='small' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Tiền cọc
                    </p>
                    <p className='font-semibold'>
                      {formatCurrency(booking?.depositAmount)}
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-2'>
                  <AccessTime className='text-primary mt-1' fontSize='small' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Thời gian ước tính
                    </p>
                    <p className='font-semibold'>
                      {booking?.totalEstimateTime} tiếng
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-2'>
                  <Category className='text-primary mt-1' fontSize='small' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Loại lịch hẹn
                    </p>
                    <span className='inline-block mt-1 px-3 py-1 text-sm bg-primary-light text-white rounded-full'>
                      {booking?.bookingType?.bookingTypeName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default UpdateBookingFormModal;
