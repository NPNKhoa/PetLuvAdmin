import React from 'react';
import CustomModal from '../common/CustomModal';
import { Divider, Paper, Grid, Box, Typography, Chip } from '@mui/material';
import {
  Receipt,
  CalendarToday,
  Update,
  AttachMoney,
  Payment,
  Person,
} from '@mui/icons-material';
import formatCurrency from '../../utils/formatCurrency';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../redux/thunks/paymentThunk';
import MyAlrt from '../../configs/alert/MyAlrt';

const getStatusStyles = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800';

  const statusLower = status.toLowerCase();

  if (
    statusLower.includes('hoàn thành') ||
    statusLower.includes('đã thanh toán')
  ) {
    return 'bg-green-100 text-green-800';
  } else if (statusLower.includes('xử lý') || statusLower.includes('chờ')) {
    return 'bg-yellow-100 text-yellow-800';
  } else if (statusLower.includes('thất bại') || statusLower.includes('hủy')) {
    return 'bg-red-100 text-red-800';
  } else if (statusLower.includes('cọc')) {
    return 'bg-blue-100 text-blue-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
};

const ViewPaymentDetailModal = ({ open, onClose, payment }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.userId === payment.userId);

  const handleToggleCompleteStatus = () => {
    dispatch(
      updateStatus({
        id: payment.orderId,
        payload: { amount: payment.amount, isComplete: true },
      })
    )
      .unwrap()
      .then(() => {
        MyAlrt.Success(
          'Thành công',
          'Cập nhật trạng thái thanh toán thành công',
          'OK'
        );
        onClose();
      })
      .catch((error) => {
        console.log(error);
        MyAlrt.Error(
          'Lỗi',
          `Cập nhật trạng thái thanh toán thất bại. ${error.message || error}`,
          'OK'
        );
      });
  };

  const handleToggleCancelStatus = () => {
    dispatch(
      updateStatus({
        id: payment.orderId,
        payload: { amount: payment.amount, isComplete: false },
      })
    )
      .unwrap()
      .then(() => {
        MyAlrt.Success(
          'Thành công',
          'Cập nhật trạng thái thanh toán thành công',
          'OK'
        );
        onClose();
      })
      .catch((error) => {
        console.log(error);
        MyAlrt.Error(
          'Lỗi',
          `Cập nhật trạng thái thanh toán thất bại. ${error.message || error}`,
          'OK'
        );
      });
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chi tiết thanh toán'
      cancelTextButton='Đóng'
      maxWidth='md'
    >
      <Box className='p-6'>
        {/* Payment Overview Section */}
        <Paper elevation={0} className='p-5 mb-6 bg-gray-50 rounded-xl'>
          <div className='flex items-center justify-between gap-2 mb-16'>
            <button
              onClick={handleToggleCompleteStatus}
              className={`mx-auto px-12 py-2 rounded-xl text-lg -mt-6 font-semibold w-full flex justify-center items-center gap-2 text-white bg-green-500 hover:bg-green-600`}
            >
              <IoMdCheckmarkCircleOutline /> Đã thanh toán
            </button>
            <button
              onClick={handleToggleCancelStatus}
              className={`mx-auto px-12 py-2 rounded-xl text-lg -mt-6 font-semibold w-full flex justify-center items-center gap-2 text-white bg-red-500 hover:bg-red-600`}
            >
              <MdOutlineCancel /> Thanh toán thất bại
            </button>
          </div>
          <Grid container spacing={3} className='mt-8'>
            {/* Left Column - Basic Info */}
            <Grid item xs={12} md={5}>
              <Box className='space-y-4'>
                <Box className='flex items-center space-x-2'>
                  <Receipt className='text-primary' />
                  <Typography variant='subtitle1' className='font-semibold'>
                    Mã giao dịch:{' '}
                    <span className='text-primary font-bold text-xl'>
                      {payment.transactionRef}
                    </span>
                  </Typography>
                </Box>

                <Box className='flex items-center space-x-2'>
                  <CalendarToday className='text-primary' />
                  <Typography variant='body1'>
                    <span className='font-medium'>Ngày tạo:</span>{' '}
                    {new Date(payment.createdAt).toLocaleString('vi-VN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>

                <Box className='flex items-center space-x-2'>
                  <Update className='text-primary' />
                  <Typography variant='body1'>
                    <span className='font-medium'>Cập nhật lần cuối:</span>{' '}
                    {new Date(payment.updatedTime).toLocaleString('vi-VN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Payment Details */}
            <Grid item xs={12} md={7}>
              <Box className='space-y-4'>
                <div className='flex items-center justify-between space-x-2'>
                  <div className='flex items-center justify-start gap-1'>
                    <AttachMoney className='text-primary' />
                    <span className='font-medium text-md'>Số tiền:</span>{' '}
                    <h6 className='font-bold text-xl text-primary'>
                      {formatCurrency(payment.amount)}
                    </h6>
                  </div>
                  <h2
                    className={`ml-10 px-12 py-2 rounded-full text-md font-semibold max-w-fit ${getStatusStyles(
                      payment.paymentStatus?.paymentStatusName
                    )}`}
                  >
                    {payment.paymentStatus?.paymentStatusName || 'N/A'}
                  </h2>
                </div>

                <Box className='flex items-center space-x-2'>
                  <Payment className='text-primary' />
                  <div className='flex items-center justify-between w-full space-x-2'>
                    <span className='font-medium'>Phương thức thanh toán:</span>{' '}
                    <span className='bg-secondary text-white rounded-full px-6 py-2'>
                      {payment.paymentMethod?.paymentMethodName}
                    </span>
                  </div>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Divider className='my-6' />

        {/* User Information Section */}
        <Box className='mb-4 mt-8'>
          <h6 className='text-primary text-2xl mb-4 flex items-center'>
            <Person className='mr-2' />
            Thông tin người dùng{' '}
            <span className='ml-1 text-sm italic font-light'>
              (click vào ID để xem thông tin chi tiết của người dùng)
            </span>
          </h6>

          <Paper elevation={0} className='p-5 bg-gray-50 rounded-xl'>
            {user ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Box className='space-y-4'>
                    <Box className='flex items-center space-x-2'>
                      <Typography variant='body1'>
                        <span className='font-medium'>ID người dùng:</span>{' '}
                        <Link
                          to={`/quan-ly-nguoi-dung/?userId=${user.userId}`}
                          className='bg-gray-100 px-3 py-1 rounded-md font-mono'
                        >
                          {user.userId}
                        </Link>
                      </Typography>
                    </Box>

                    <Box className='flex items-center space-x-2'>
                      <Typography variant='body1'>
                        <span className='font-medium'>Họ và tên:</span>{' '}
                        <span className='font-semibold'>{user.fullName}</span>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Box className='space-y-4'>
                    <Box className='flex items-center space-x-2'>
                      <Typography variant='body1'>
                        <span className='font-medium'>Số điện thoại:</span>{' '}
                        <span>{user.phoneNumber}</span>
                      </Typography>
                    </Box>

                    <Box className='flex items-center space-x-2'>
                      <Typography variant='body1'>
                        <span className='font-medium'>Email:</span>{' '}
                        <span>{user.email}</span>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Typography variant='body1' className='text-gray-500 italic'>
                Không tìm thấy thông tin người dùng
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </CustomModal>
  );
};

// Helper function to determine status color
const getStatusColor = (status) => {
  if (!status) return 'bg-gray-500';

  const statusLower = status.toLowerCase();

  if (statusLower.includes('thành công')) {
    return 'bg-green-500';
  } else if (statusLower.includes('đặt cọc')) {
    return 'bg-secondary-light';
  } else if (statusLower.includes('thất bại')) {
    return 'bg-red-600';
  } else if (statusLower.includes('chờ')) {
    return 'bg-yellow-500';
  }

  return 'bg-gray-500';
};

export default ViewPaymentDetailModal;
