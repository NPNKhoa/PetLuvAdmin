import CustomModal from '../common/CustomModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPetById } from '../../redux/thunks/petThunk';
import { getUserById } from '../../redux/thunks/userThunk';
import dayjs from 'dayjs';
import formatCurrency from '../../utils/formatCurrency';
import { Divider } from '@mui/material';

const paymentStatusColors = {
  'Chờ thanh toán': '#FFA500',
  'Đã đặt cọc': '#FFD700',
  'Đã thanh toán': '#008000',
  'Thanh toán thất bại': '#FF0000',
};

const bookingStatusColors = {
  'Đã hủy': '#808080',
  'Đã xác nhận': '#0000FF',
  'Đã hoàn thành': '#008000',
  'Đang xử lý': '#FFA500',
};

function getPaymentStatusColor(paymentStatusName) {
  return paymentStatusColors[paymentStatusName] || '#fff';
}

function getBookingStatusColor(bookingStatusName) {
  return bookingStatusColors[bookingStatusName] || '#fff';
}

const ViewBookingDetailModal = ({ open, onClose, booking }) => {
  const dispatch = useDispatch();

  const fetchedPet = useSelector((state) => state.pets.pet);
  const fetchedUser = useSelector((state) => state.users.user);

  const { pet, user } = booking;

  if (!pet) {
    dispatch(getPetById(booking?.petId));
  }

  if (!user) {
    dispatch(getUserById(booking?.customerId));
  }

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chi tiết Lịch hẹn'
      cancelTextButton='Đóng'
    >
      <div className='grid grid-cols-2 gap-6 p-4 mb-10'>
        {/* Cột 1 */}
        <div className='space-y-2'>
          <h1 className='text-2xl text-primary font-bold'>
            Thông tin lịch hẹn
          </h1>
          <p>
            <strong>Mã Lịch hẹn:</strong> {booking.bookingId}
          </p>
          <p>
            <strong>Loại Lịch hẹn:</strong>{' '}
            {booking.bookingType?.bookingTypeName}
          </p>
          <p>
            <strong>Tổng thời gian ước tính:</strong>{' '}
            {booking.totalEstimateTime} giờ
          </p>
          <p>
            <strong>Ghi chú:</strong> {booking.bookingNote || 'Không có'}
          </p>
        </div>

        {/* Cột 2 */}
        <div className='space-y-2'>
          <h1 className='text-2xl text-primary font-bold'>
            Thông tin khách hàng
          </h1>
          <p>
            <strong>Mã Khách hàng:</strong>{' '}
            {user ? user.userId : fetchedUser.userId}
          </p>
          <p>
            <strong>Tên Khách hàng:</strong>{' '}
            {user ? user.fullName : fetchedUser.fullName}
          </p>
          <p>
            <strong>Email Khách hàng:</strong>{' '}
            {user ? user.email : fetchedUser.email}
          </p>
          <p>
            <strong>SĐT Khách hàng:</strong>{' '}
            {user ? user.phoneNumber : fetchedUser.phoneNumber}
          </p>
          <p>
            <strong>Mã Thú cưng:</strong> {pet ? pet.petId : fetchedPet.petId}
          </p>
          <p>
            <strong>Tên Thú cưng:</strong>{' '}
            {pet ? pet.petName : fetchedPet.petName}
          </p>
        </div>
      </div>

      <Divider />

      {/* Bảng chi tiết Lịch hẹn */}
      <div className='mt-4 p-4'>
        {/* Bảng dịch vụ đã đặt */}
        <h1 className='text-2xl text-primary font-bold mb-2'>
          Chi tiết lịch hẹn
        </h1>
        <div className='grid grid-cols-2 gap-6 mt-6'>
          <div className='space-y-2'>
            <p>
              <strong>Thời gian bắt đầu:</strong>{' '}
              {dayjs(booking.bookingStartTime).format('DD/MM/YYYY HH:mm:ss')}
            </p>
            <p>
              <strong>Thời gian kết thúc:</strong>{' '}
              {dayjs(booking.bookingEndTime).format('DD/MM/YYYY HH:mm:ss')}
            </p>
            <p>
              <strong>Tổng tiền:</strong> {formatCurrency(booking.totalAmount)}
            </p>
            <p>
              <strong>Tiền đặt cọc: </strong>
              {formatCurrency(booking.depositAmount)}
            </p>
          </div>

          <div className='space-y-2'>
            <p className='flex items-center gap-2'>
              <strong>Trạng thái Lịch hẹn:</strong>{' '}
              <p
                style={{
                  backgroundColor: getBookingStatusColor(
                    booking.bookingStatus?.bookingStatusName
                  ),
                }}
                className='px-6 py-1 rounded-full text-white'
              >
                {booking.bookingStatus?.bookingStatusName}
              </p>
            </p>
            <p className='flex items-center gap-2'>
              <strong>Trạng thái thanh toán:</strong>{' '}
              <p
                style={{
                  backgroundColor: getPaymentStatusColor(
                    booking.paymentStatusName
                  ),
                }}
                className='px-6 py-1 rounded-full text-white'
              >
                {booking.paymentStatusName}
              </p>
            </p>
            <p>
              <strong>Thời gian thuê phòng:</strong>{' '}
              {booking.roomRentalTime ? `${booking.roomRentalTime} giờ` : 'N/A'}
            </p>
          </div>
        </div>

        {booking.serviceBookingDetails?.length > 0 && (
          <div>
            <h3 className='text-xl text-secondary-light font-semibold mb-4 mt-8'>
              Dịch vụ đã đặt
            </h3>
            <table className='w-full border-collapse border border-gray-300 mb-4'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-300 p-2'>Dịch vụ</th>
                  <th className='border border-gray-300 p-2'>Cân nặng</th>
                  <th className='border border-gray-300 p-2'>Giá</th>
                </tr>
              </thead>
              <tbody>
                {booking.serviceBookingDetails.map((service, index) => (
                  <tr key={index} className='text-center'>
                    <td className='border border-gray-300 p-2'>
                      {service.serviceItemName}
                    </td>
                    <td className='border border-gray-300 p-2'>
                      {service.petWeightRange}
                    </td>
                    <td className='border border-gray-300 p-2'>
                      {formatCurrency(service.bookingItemPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bảng combo dịch vụ đã đặt */}
        {booking.serviceComboBookingDetails?.length > 0 && (
          <div className='mt-4'>
            <h3 className='font-semibold mb-2'>Combo dịch vụ đã đặt</h3>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-300 p-2'>Tên combo</th>
                  <th className='border border-gray-300 p-2'>Giá</th>
                </tr>
              </thead>
              <tbody>
                {booking.serviceComboBookingDetails.map((combo, index) => (
                  <tr key={index} className='text-center'>
                    <td className='border border-gray-300 p-2'>
                      {combo.comboName}
                    </td>
                    <td className='border border-gray-300 p-2'>
                      {combo.comboPrice} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bảng phòng đã đặt */}
        {booking.roomBookingItem?.length > 0 && (
          <div className='mt-4'>
            <h3 className='font-semibold mb-2'>Phòng đã đặt</h3>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-300 p-2'>Tên phòng</th>
                  <th className='border border-gray-300 p-2'>Giá</th>
                </tr>
              </thead>
              <tbody>
                {booking.roomBookingItem.map((room, index) => (
                  <tr key={index} className='text-center'>
                    <td className='border border-gray-300 p-2'>
                      {room.roomName}
                    </td>
                    <td className='border border-gray-300 p-2'>
                      {room.roomPrice} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default ViewBookingDetailModal;
