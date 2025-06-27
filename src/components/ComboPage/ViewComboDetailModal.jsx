import React, { useEffect, useState, useCallback, useMemo } from 'react';
import CustomModal from '../common/CustomModal';
import { Divider } from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AddVariantModal from '../ServicePage/AddVariantModal';
import { useDispatch } from 'react-redux';
import { getPetBreeds } from '../../redux/thunks/petBreedThunk';
import { toast } from 'react-toastify';
import {
  createComboVariant,
  deleteComboVariant,
  updateComboVariant,
} from '../../redux/thunks/comboVariantThunk';

const ViewComboDetailModal = ({ open, onClose, combo }) => {
  const dispatch = useDispatch();
  const comboVariants = useSelector(
    (state) => state.comboVariants.comboVariants
  );

  const loggedInUser = useSelector((state) => state.auth.user);

  const userRole = useMemo(() => loggedInUser?.staffType, [loggedInUser]);

  const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);

  const handleOpenAddVariantModal = () => {
    dispatch(getPetBreeds())
      .unwrap()
      .then(() => setIsAddVariantModalOpen(true))
      .catch((error) => {
        console.error('Error fetching pet breeds:', error);
        toast.error(
          'Có lỗi xảy ra trong quá trình truy vấn thông tin giống, vui lòng thử lại sau'
        );
      });
  };

  const handleCloseAddVariantModal = () => {
    setIsAddVariantModalOpen(false);
  };

  const handleAddComboVariant = useCallback(
    (variant, updatingVariant) => {
      // Implementation will be done by you as mentioned
      console.log('Adding variant:', variant);

      dispatch(
        createComboVariant({
          ...variant,
          serviceComboId: variant.serviceId,
          weightRange: variant.petWeightRange,
          comboPrice: variant.price,
        })
      )
        .unwrap()
        .then(() => {
          toast.success('Thêm mới biến thể thành công');
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            'Có lỗi xảy ra trong quá trình thêm mới biến thể, vui lòng thử lại sau'
          );
        });
    },
    [dispatch]
  );

  // const handleOpenEditVariantModal = (variant) => {
  //   dispatch(getPetBreeds());
  //   setSelectedVariant(variant);
  //   setShowEditVariantModal(true);
  // };

  // const handleUpdateVariant = (updatedVariant) => {
  //   const payload = {
  //     serviceId: updatedVariant.serviceId,
  //     breedId: updatedVariant.breedId,
  //     petWeightRange: updatedVariant.petWeightRange,
  //     body: updatedVariant,
  //   };
  //   dispatch(updateComboVariant(payload))
  //     .unwrap()
  //     .then(() => {
  //       toast.success('Cập nhật biến thể thành công');
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       toast.error(e);
  //     });
  // };

  const handleDeleteVariant = (variant) => {
    const payload = {
      serviceComboId: variant.serviceComboId,
      breedId: variant.breedId,
      weightRange: variant.weightRange,
      comboPrice: variant.price,
    };
    dispatch(deleteComboVariant(payload))
      .unwrap()
      .then((data) => {
        toast.success('Xóa biến thể thành công');
      })
      .catch((e) => {
        console.log(e);
        toast.error(e?.message || e || 'Có lỗi xảy ra, vui long thử lại sau');
      });
  };

  return (
    <>
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
                  className={
                    combo.isVisible ? 'text-green-600' : 'text-red-600'
                  }
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

          <Divider />

          {/* Combo Variants */}
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold text-primary mb-3'>
              Các biến thể
            </h3>

            {userRole === 'admin' && (
              <button
                className='py-2 px-6 rounded-full bg-primary text-white cursor-pointer hover:bg-primary-dark'
                onClick={handleOpenAddVariantModal}
              >
                + Thêm biến thể
              </button>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
            {comboVariants?.length > 0 ? (
              comboVariants.map((variant, index) => (
                <div
                  key={index}
                  className='relative border rounded-lg p-4 shadow bg-gray-50'
                >
                  {/* Nội dung biến thể */}
                  <div className='space-y-1'>
                    <div className='flex items-center justify-between my-1'>
                      <p>
                        <strong>Giống:</strong> {variant.breedName}
                      </p>
                      <p>
                        <strong>Cân nặng:</strong> {variant.weightRange}
                      </p>
                    </div>
                    <div className='flex items-center justify-between my-1'>
                      <p>
                        <strong>Giá:</strong>{' '}
                        {formatCurrency(variant.comboPrice)}
                      </p>
                      <p>
                        <strong>Ước tính:</strong> {variant.estimateTime} tiếng
                      </p>
                    </div>
                    <div className='flex items-center justify-between pt-4'>
                      <p className='py-4'>
                        {variant.isVisible ? (
                          <span className='bg-primary px-8 py-2 rounded-full text-white'>
                            Hiển thị
                          </span>
                        ) : (
                          <span className='bg-secondary-light px-8 py-2 rounded-full text-white'>
                            Đã ẩn
                          </span>
                        )}
                      </p>

                      <div>
                        {/* <IconButton
                          color='info'
                          onClick={() => handleOpenEditVariantModal(variant)}
                        >
                          <Edit />
                        </IconButton> */}
                        <IconButton
                          color='error'
                          onClick={() => handleDeleteVariant(variant)}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='italic text-gray-600'>
                Không tìm thấy biến thể phù hợp
              </p>
            )}
          </div>
        </div>
      </CustomModal>

      {/* Add Variant Modal */}
      <AddVariantModal
        open={isAddVariantModalOpen}
        onClose={handleCloseAddVariantModal}
        serviceId={combo.serviceComboId}
        onAddVariant={handleAddComboVariant}
      />
    </>
  );
};

export default ViewComboDetailModal;
