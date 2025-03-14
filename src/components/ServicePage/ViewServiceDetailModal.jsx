import React from 'react';
import CustomModal from '../common/CustomModal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ViewServiceDetailModal = ({ open, onClose, service }) => {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chi tiết dịch vụ'
      cancelTextButton='Đóng'
    >
      <div className='grid grid-cols-2 gap-6 p-4'>
        {/* Cột ảnh */}
        <div className='flex flex-col gap-2'>
          {service.serviceImageUrls?.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Service ${index}`}
              className='w-full h-40 object-cover rounded-lg shadow'
            />
          ))}
        </div>

        {/* Cột nội dung */}
        <div className='space-y-2 overflow-y-auto max-h-96'>
          <p>
            <strong>ID:</strong> {service.serviceId}
          </p>
          <p>
            <strong>Tên dịch vụ:</strong> {service.serviceName}
          </p>
          <p>
            <strong>Mô tả:</strong> {service.serviceDesc}
          </p>
          <p>
            <strong>Loại dịch vụ:</strong> {service.serviceTypeName}
          </p>
          <p>
            <strong>Trạng thái:</strong> {service.isVisible ? 'Hiển thị' : 'Ẩn'}
          </p>

          {/* Biến thể dịch vụ */}
          {service.serviceVariants?.length > 0 && (
            <div className='border-t pt-2'>
              <p className='font-semibold'>Các biến thể:</p>
              <div className='mt-2'>
                {service.serviceVariants.map((variant, index) => (
                  <div
                    key={index}
                    className='relative border rounded-lg p-3 shadow-sm bg-gray-50'
                  >
                    {/* Icon trạng thái ở góc phải trên */}
                    <div className='absolute top-2 right-2'>
                      {variant.isVisible ? (
                        <FaEye className='text-green-500' />
                      ) : (
                        <FaEyeSlash className='text-red-500' />
                      )}
                    </div>

                    {/* Nội dung biến thể */}
                    <div className='grid grid-cols-2 gap-2'>
                      <p>
                        <strong>Giống:</strong> {variant.breedName}
                      </p>
                      <p>
                        <strong>Cân nặng:</strong> {variant.petWeightRange}
                      </p>
                      <p>
                        <strong>Giá:</strong> {variant.price} VND
                      </p>
                      <p>
                        <strong>Ước tính:</strong> {variant.estimateTime} tiếng
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewServiceDetailModal;
