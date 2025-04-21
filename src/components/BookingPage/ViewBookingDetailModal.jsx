import CustomModal from '../common/CustomModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPetById } from '../../redux/thunks/petThunk';
import { getUserById } from '../../redux/thunks/userThunk';
import dayjs from 'dayjs';
import formatCurrency from '../../utils/formatCurrency';
import { Divider } from '@mui/material';
import {
  FaCalendarAlt,
  FaUser,
  FaPaw,
  FaMoneyBillWave,
  FaClock,
  FaClipboardList,
  FaInfoCircle,
  FaRegStickyNote,
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdPayment, MdRoomService } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';

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
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
          {/* Booking Information */}
          <div className='bg-blue-50 p-5 rounded-lg shadow-sm'>
            <h2 className='text-2xl text-primary font-bold flex items-center gap-2 mb-4 border-b pb-2'>
              <FaCalendarAlt className='text-primary' /> Thông tin lịch hẹn
            </h2>
            <div className='space-y-3'>
              <div className='flex items-start'>
                <FaInfoCircle className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>
                    Mã Lịch hẹn:
                  </span>
                  <span className='ml-2 text-gray-800'>
                    {booking.bookingId}
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <FaClipboardList className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>
                    Loại Lịch hẹn:
                  </span>
                  <span className='ml-2 text-gray-800'>
                    {booking.bookingType?.bookingTypeName}
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <FaClock className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>
                    Tổng thời gian ước tính:
                  </span>
                  <span className='ml-2 text-gray-800'>
                    {booking.totalEstimateTime} giờ
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <FaRegStickyNote className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>Ghi chú:</span>
                  <span className='ml-2 text-gray-800'>
                    {booking.bookingNote || 'Không có'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className='bg-amber-50 p-5 rounded-lg shadow-sm'>
            <h2 className='text-2xl text-primary font-bold flex items-center gap-2 mb-4 border-b pb-2'>
              <FaUser className='text-primary' /> Thông tin khách hàng
            </h2>
            <div className='space-y-3'>
              <div className='flex items-start'>
                <FaUser className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>
                    Mã Khách hàng:
                  </span>
                  <span className='ml-2 text-gray-800'>
                    {user ? user.userId : fetchedUser.userId}
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <FaUser className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>
                    Tên Khách hàng:
                  </span>
                  <span className='ml-2 text-gray-800'>
                    {user ? user.fullName : fetchedUser.fullName}
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <MdEmail className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>Email:</span>
                  <span className='ml-2 text-gray-800'>
                    {user ? user.email : fetchedUser.email}
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <MdPhone className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>SĐT:</span>
                  <span className='ml-2 text-gray-800'>
                    {user ? user.phoneNumber : fetchedUser.phoneNumber}
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <FaPaw className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>
                    Mã Thú cưng:
                  </span>
                  <span className='ml-2 text-gray-800'>
                    {pet ? pet.petId : fetchedPet.petId}
                  </span>
                </div>
              </div>

              <div className='flex items-start'>
                <FaPaw className='mt-1 mr-2 text-gray-600' />
                <div>
                  <span className='font-semibold text-gray-700'>
                    Tên Thú cưng:
                  </span>
                  <span className='ml-2 text-gray-800'>
                    {pet ? pet.petName : fetchedPet.petName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider className='my-4' />

        {/* Booking Details */}
        <div className='p-6'>
          <h2 className='text-2xl text-primary font-bold flex items-center gap-2 mb-6'>
            <FaClipboardList className='text-primary' /> Chi tiết lịch hẹn
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
              <div className='space-y-3'>
                <div className='flex items-start'>
                  <BsClockHistory className='mt-1 mr-2 text-gray-600' />
                  <div>
                    <span className='font-semibold text-gray-700'>
                      Thời gian bắt đầu:
                    </span>
                    <span className='ml-2 text-gray-800'>
                      {dayjs(booking.bookingStartTime).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </span>
                  </div>
                </div>

                <div className='flex items-start'>
                  <BsClockHistory className='mt-1 mr-2 text-gray-600' />
                  <div>
                    <span className='font-semibold text-gray-700'>
                      Thời gian kết thúc:
                    </span>
                    <span className='ml-2 text-gray-800'>
                      {dayjs(booking.bookingEndTime).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </span>
                  </div>
                </div>

                <div className='flex items-start'>
                  <FaMoneyBillWave className='mt-1 mr-2 text-gray-600' />
                  <div>
                    <span className='font-semibold text-gray-700'>
                      Tổng tiền:
                    </span>
                    <span className='ml-2 text-gray-800'>
                      {formatCurrency(booking.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className='flex items-start'>
                  <FaMoneyBillWave className='mt-1 mr-2 text-gray-600' />
                  <div>
                    <span className='font-semibold text-gray-700'>
                      Tiền đặt cọc:
                    </span>
                    <span className='ml-2 text-gray-800'>
                      {formatCurrency(booking.depositAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
              <div className='space-y-3'>
                <div className='flex items-center'>
                  <FaInfoCircle className='mr-2 text-gray-600' />
                  <span className='font-semibold text-gray-700 mr-2'>
                    Trạng thái Lịch hẹn:
                  </span>
                  <span
                    className='px-4 py-1 rounded-full text-white text-sm font-medium'
                    style={{
                      backgroundColor: getBookingStatusColor(
                        booking.bookingStatus?.bookingStatusName
                      ),
                    }}
                  >
                    {booking.bookingStatus?.bookingStatusName}
                  </span>
                </div>

                <div className='flex items-center'>
                  <MdPayment className='mr-2 text-gray-600' />
                  <span className='font-semibold text-gray-700 mr-2'>
                    Trạng thái thanh toán:
                  </span>
                  <span
                    className='px-4 py-1 rounded-full text-white text-sm font-medium'
                    style={{
                      backgroundColor: getPaymentStatusColor(
                        booking.paymentStatusName
                      ),
                    }}
                  >
                    {booking.paymentStatusName}
                  </span>
                </div>

                <div className='flex items-start'>
                  <FaClock className='mt-1 mr-2 text-gray-600' />
                  <div>
                    <span className='font-semibold text-gray-700'>
                      Thời gian thuê phòng:
                    </span>
                    <span className='ml-2 text-gray-800'>
                      {booking.roomRentalTime
                        ? `${booking.roomRentalTime} giờ`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Table */}
          {booking.serviceBookingDetails?.length > 0 && (
            <div className='mb-8'>
              <h3 className='text-xl text-secondary-light font-semibold mb-4 flex items-center gap-2'>
                <MdRoomService className='text-secondary-light' /> Dịch vụ đã
                đặt
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse rounded-lg overflow-hidden'>
                  <thead>
                    <tr className='bg-blue-100'>
                      <th className='border border-gray-300 p-3 text-left'>
                        Dịch vụ
                      </th>
                      <th className='border border-gray-300 p-3 text-left'>
                        Cân nặng
                      </th>
                      <th className='border border-gray-300 p-3 text-right'>
                        Giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.serviceBookingDetails.map((service, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className='border border-gray-300 p-3'>
                          {service.serviceItemName}
                        </td>
                        <td className='border border-gray-300 p-3'>
                          {service.petWeightRange}
                        </td>
                        <td className='border border-gray-300 p-3 text-right font-medium'>
                          {formatCurrency(service.bookingItemPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Service Combo Table */}
          {booking.serviceComboBookingDetails?.length > 0 && (
            <div className='mb-8'>
              <h3 className='text-xl text-secondary-light font-semibold mb-4 flex items-center gap-2'>
                <MdRoomService className='text-secondary-light' /> Combo dịch vụ
                đã đặt
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse rounded-lg overflow-hidden'>
                  <thead>
                    <tr className='bg-blue-100'>
                      <th className='border border-gray-300 p-3 text-left'>
                        Tên combo
                      </th>
                      <th className='border border-gray-300 p-3 text-right'>
                        Giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.serviceComboBookingDetails.map((combo, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className='border border-gray-300 p-3'>
                          {combo.comboName}
                        </td>
                        <td className='border border-gray-300 p-3 text-right font-medium'>
                          {formatCurrency(combo.comboPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Room Booking Table */}
          {booking.roomBookingItem?.length > 0 && (
            <div className='mb-4'>
              <h3 className='text-xl text-secondary-light font-semibold mb-4 flex items-center gap-2'>
                <MdRoomService className='text-secondary-light' /> Phòng đã đặt
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse rounded-lg overflow-hidden'>
                  <thead>
                    <tr className='bg-blue-100'>
                      <th className='border border-gray-300 p-3 text-left'>
                        Tên phòng
                      </th>
                      <th className='border border-gray-300 p-3 text-right'>
                        Giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.roomBookingItem.map((room, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className='border border-gray-300 p-3'>
                          {room.roomName}
                        </td>
                        <td className='border border-gray-300 p-3 text-right font-medium'>
                          {formatCurrency(room.roomPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewBookingDetailModal;
