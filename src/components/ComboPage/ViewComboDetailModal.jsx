import React from 'react';
import CustomModal from '../common/CustomModal';
import { Divider } from '@mui/material';

const ViewComboDetailModal = ({ open, onClose, combo }) => {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chi tiết Combo'
      cancelTextButton='Đóng'
    >
      <div className='space-y-6 p-4'>
        {/* Thông tin combo */}
        <div className='rounded-lg py-4 '>
          <h3 className='text-xl font-semibold text-primary mb-3'>
            Thông tin Combo
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            <p>
              <strong>ID:</strong> {combo.serviceComboId}
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              <span
                className={combo.isVisible ? 'text-green-600' : 'text-red-600'}
              >
                {combo.isVisible ? 'Hiển thị' : 'Ẩn'}
              </span>
            </p>
            <p className='col-span-2'>
              <strong>Tên:</strong> {combo.serviceComboName}
            </p>
            <p className='col-span-2'>
              <strong>Mô tả:</strong> {combo.serviceComboDesc}
            </p>
          </div>
        </div>

        <Divider />

        {/* Danh sách dịch vụ */}
        <div className='rounded-lg py-4 '>
          <h3 className='text-xl font-semibold text-primary mb-3'>
            Dịch vụ trong Combo
          </h3>
          {combo.services?.length > 0 ? (
            <div className='max-h-60 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
              {combo.services.map((service) => (
                <div
                  key={service.serviceId}
                  className='border p-3 rounded-lg bg-white shadow-sm flex flex-col justify-start min-h-[6rem] h-full'
                >
                  <p className='font-semibold truncate mb-1'>
                    {service.serviceName}
                  </p>
                  <p className='text-sm text-gray-600 line-clamp-2'>
                    {service.serviceDesc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500'>Không có dịch vụ nào.</p>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewComboDetailModal;
