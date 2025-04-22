import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import CustomModal from '../common/CustomModal';
import { toast } from 'react-toastify';
import { FaPaw, FaUserTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getUserById, togleAccountStatus } from '../../redux/thunks/userThunk';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getPetByUser } from '../../redux/thunks/petThunk';
import calculatePetAge from '../../utils/calculatePetAge';
import MyAlrt from '../../configs/alert/MyAlrt';

const ViewUserDetailModal = ({ open, onClose, userId }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.users.loading);

  const userPets = useSelector((state) => state.pets.userPets);
  const userPetLoading = useSelector((state) => state.pets.userPetLoading);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId))
        .unwrap()
        .then()
        .catch((error) => {
          console.log(error);
          toast.error(
            error?.message || error || 'Có lỗi xay ra, vui lòng thử lại sau!'
          );
        });
    }

    dispatch(getPetByUser(userId));
  }, [dispatch, userId]);

  const handleToggleStatus = () => {
    if (!userId) {
      return toast.error('Không thể xác định người dùng');
    }

    const statusText = user?.isActive ? 'khóa' : 'kích hoạt';

    MyAlrt.Warning(
      `Xác nhận thay đổi trạng thái`,
      `Bạn có chắc chắn muốn ${statusText} tài khoản này?`,
      'Xác nhận',
      true,
      async () => {
        dispatch(togleAccountStatus(userId))
          .unwrap()
          .then(() => {
            toast.success(
              `${
                statusText.charAt(0).toUpperCase() + statusText.slice(1)
              } tài khoản thành công!`
            );
          })
          .catch((error) => {
            toast.error('Cập nhật thất bại! Vui lòng thử lại.');
            console.log(error);
          });
      }
    );
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chi tiết người dùng'
      cancelTextButton='Đóng'
    >
      <div className='p-4 space-y-6'>
        {loading ? (
          <div className='w-full h-full flex justify-center items-center py-10'>
            <CircularProgress size={'4rem'} />
          </div>
        ) : user ? (
          <>
            {/* Khu vực thông tin tổng quan */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-8'>
              {/* Cột ảnh đại diện */}
              <div className='flex flex-col items-center justify-center'>
                <div className='w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4'>
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt='User? avatar'
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <span className='text-6xl text-gray-400'>
                      {user?.fullName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className='flex flex-col items-center gap-3'>
                  <span
                    className={`px-6 py-2 rounded-full text-white
                    ${user?.isActive ? 'bg-secondary-light' : 'bg-red-600'}`}
                  >
                    {user?.isActive ? 'Hoạt động' : 'Bị khóa'}
                  </span>

                  <button
                    className={`rounded-lg px-6 py-2 text-white font-medium flex items-center gap-2
                    ${
                      user?.isActive
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={handleToggleStatus}
                  >
                    <FaUserTimes />
                    {user?.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                  </button>
                </div>
              </div>

              {/* Cột thông tin cá nhân */}
              <div className='space-y-3'>
                <p>
                  <strong>ID:</strong> {user?.userId}
                </p>
                <p>
                  <strong>Họ và tên:</strong> {user?.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {user?.phoneNumber}
                </p>
                <p>
                  <strong>Ngày sinh:</strong> {user?.dateOfBirth}
                </p>
                <p>
                  <strong>Giới tính:</strong> {user?.gender ? 'Nam' : 'Nữ'}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {user?.address}
                </p>
                <p>
                  <strong>Ngày tạo tài khoản:</strong>{' '}
                  {dayjs(user?.createdDate).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>

            {/* Phần thú cưng */}
            <div className='border-t pt-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='font-cute text-primary tracking-wide text-xl'>
                  Thú cưng
                </h2>
              </div>

              <div className='pt-2'>
                {userPetLoading ? (
                  <div className='w-full h-full flex justify-center items-center py-10'>
                    <CircularProgress size={'4rem'} />
                  </div>
                ) : userPets && userPets.length > 0 ? (
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {userPets.map((pet) => (
                      <div
                        key={pet.petId}
                        className='relative border rounded-lg p-4 shadow bg-gray-50'
                      >
                        <div className='flex items-center mb-2'>
                          <FaPaw className='text-primary mr-2' />
                          <h3 className='font-medium text-lg'>{pet.petName}</h3>
                        </div>
                        <div className='space-y-1'>
                          <p>
                            <strong>Giống:</strong> {pet.breedName}
                          </p>
                          <p>
                            <strong>Tuổi:</strong>{' '}
                            {calculatePetAge(pet?.petDateOfBirth)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-500 italic'>
                    Người dùng chưa có thú cưng nào
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className='py-10 text-center text-gray-500'>
            Không tìm thấy thông tin người dùng
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default ViewUserDetailModal;
