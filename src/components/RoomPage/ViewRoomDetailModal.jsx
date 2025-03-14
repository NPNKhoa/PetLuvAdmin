import React from 'react';
import CustomModal from '../common/CustomModal';
import formatCurrency from '../../utils/formatCurrency';

const ViewRoomDetailModal = ({ open, onClose, room }) => {
  if (!room) return null;

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chi tiết phòng'
      cancelTextButton='Đóng'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
        {/* Cột ảnh */}
        <div className='flex flex-col items-center'>
          <div className='w-full flex gap-2 p-2 border rounded-lg'>
            {room.roomImages.length > 0 ? (
              room.roomImages.map((image, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_API_BASE_URL}${image}`}
                  alt={`Room ${room.roomName} - ${index + 1}`}
                  className='w-32 h-32 object-cover rounded-lg shadow-md'
                />
              ))
            ) : (
              <p className='text-gray-500'>Không có ảnh</p>
            )}
          </div>
        </div>

        {/* Cột thông tin */}
        <div className='overflow-y-auto max-h-80 space-y-2'>
          <p>
            <strong>ID Phòng:</strong> {room.roomId}
          </p>
          <p>
            <strong>Tên phòng:</strong> {room.roomName}
          </p>
          <p>
            <strong>Mô tả:</strong> {room.roomDesc}
          </p>
          <p>
            <strong>Loại phòng:</strong> {room.roomTypeName}
          </p>
          <p>
            <strong>Giá theo giờ:</strong> {formatCurrency(room.pricePerHour)}
          </p>
          <p>
            <strong>Giá theo ngày:</strong> {formatCurrency(room.pricePerDay)}
          </p>
          <p>
            <strong>Trạng thái:</strong> {room.isVisible ? 'Hiển thị' : 'Ẩn'}
          </p>
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewRoomDetailModal;
