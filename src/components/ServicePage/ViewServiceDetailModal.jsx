import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CustomModal from '../common/CustomModal';
import formatCurrency from '../../utils/formatCurrency';
import AddVariantModal from './AddVariantModal';
import { useDispatch } from 'react-redux';
import { getPetBreeds } from '../../redux/thunks/petBreedThunk';
import {
  createServiceVariant,
  getServiceVairantById,
  updateServiceVariant,
} from '../../redux/thunks/serviceVariantThunk';
import { toast } from 'react-toastify';
import { Divider, IconButton } from '@mui/material';
import { updateVariants } from '../../redux/slices/serviceSlice';
import { Delete, Edit } from '@mui/icons-material';
import EditVariantModal from './EditVariantModal';
import {
  createWalkDogVariant,
  getWalkDogVariantByServiceId,
} from '../../redux/thunks/walkDogVariantThunk';
import AddWalkDogVariantModal from './AddWalkDogVariantModal';
import { useSelector } from 'react-redux';

const ViewServiceDetailModal = ({ open, onClose, service }) => {
  const dispatch = useDispatch();

  const [showAddVariantModal, setShowAddVariantModal] = useState(false);
  const [showEditVariantModal, setShowEditVariantModal] = useState(false);

  const [variants, setVariants] = useState(service.serviceVariants || []);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [showMore, setShowMore] = useState(false);
  const descRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const walkDogVariants = useSelector(
    (state) => state.walkDogVariants.walkDogVariants
  );

  useEffect(() => {
    if (
      Array.isArray(service.walkDogServiceVariants) &&
      service.walkDogServiceVariants?.length === 0
    ) {
      dispatch(getWalkDogVariantByServiceId(service.serviceId));
    }

    if (descRef.current) {
      setIsOverflowing(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  const petType = useMemo(() => {
    if (!service) return '';

    if (!service?.serviceVariants) return '';

    if (service.serviceVariants.length === 0) {
      return service.serviceName.toLowerCase().includes('chó')
        ? 'chó'
        : service.serviceName.toLowerCase().includes('mèo')
        ? 'mèo'
        : '';
    }

    const breedName = service.serviceVariants[0].breedName.toLowerCase();

    return breedName.includes('chó')
      ? 'chó'
      : breedName.includes('mèo')
      ? 'mèo'
      : '';
  }, [service]);

  const handleOpenAddVariantModal = () => {
    // Pre-fetch pet breed
    dispatch(getPetBreeds({ petType }));

    setShowAddVariantModal(true);
  };

  const handleCloseAddVariantModal = () => {
    setShowAddVariantModal(false);
  };

  const handleAddVariant = (newVariant, updatingVariant) => {
    if (service.serviceTypeName.toLowerCase().includes('dắt chó')) {
      dispatch(createWalkDogVariant(newVariant))
        .unwrap()
        .then(() => {
          dispatch(updateVariants(updatingVariant));
          toast.success('Thêm mới biến thể thành công');
        })
        .catch((e) => toast.error(e.message || e));

      setVariants([...variants, newVariant]);
      return;
    }

    dispatch(createServiceVariant(newVariant))
      .unwrap()
      .then(() => {
        dispatch(updateVariants(updatingVariant));
        toast.success('Thêm mới biến thể thành công');
      })
      .catch((e) => toast.error(e));

    setVariants([...variants, newVariant]);
  };

  const handleOpenEditVariantModal = (variant) => {
    setSelectedVariant(variant);
    setShowEditVariantModal(true);
  };

  const handleCloseEditVariantModal = () => {
    setShowEditVariantModal(false);
    setSelectedVariant(null);
  };

  const handleUpdateVariant = (updatedVariant) => {
    const payload = {
      serviceId: updatedVariant.serviceId,
      breedId: updatedVariant.breedId,
      petWeightRange: updatedVariant.petWeightRange,
      body: updatedVariant,
    };
    dispatch(updateServiceVariant(payload))
      .unwrap()
      .then(() => {
        toast.success('Cập nhật biến thể thành công');
      })
      .catch((e) => {
        console.log(e);
        toast.error(e);
      });
  };

  const finalWalkDogVariants = useMemo(() => {
    return service.walkDogServiceVariants?.length > 0
      ? service.walkDogServiceVariants
      : walkDogVariants?.length > 0
      ? walkDogVariants
      : [];
  }, [service.walkDogServiceVariants, walkDogVariants]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chi tiết dịch vụ'
      cancelTextButton='Đóng'
    >
      <div className='p-4 space-y-6'>
        {/* Khu vực thông tin tổng quan */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-8'>
          {/* Cột ảnh */}
          <div className='grid grid-cols-2 gap-2'>
            {service.serviceImageUrls?.length > 0 ? (
              service.serviceImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Service ${index}`}
                  className='w-full aspect-square object-cover rounded-lg shadow-md'
                />
              ))
            ) : (
              <p className='text-gray-500'>Không có hình ảnh</p>
            )}
          </div>

          {/* Cột thông tin */}
          <div className='space-y-2'>
            <p>
              <strong>ID:</strong> {service.serviceId}
            </p>
            <p>
              <strong>Tên dịch vụ:</strong> {service.serviceName}
            </p>
            <p>
              <strong>Loại dịch vụ:</strong> {service.serviceTypeName}
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              <span
                className={`px-2 py-1 rounded-md ${
                  service.isVisible
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {service.isVisible ? 'Hiển thị' : 'Ẩn'}
              </span>
            </p>
            <p>
              <strong>Mô tả:</strong>{' '}
              <span
                ref={descRef}
                className={`block overflow-hidden transition-all ${
                  showMore ? 'line-clamp-none' : 'line-clamp-3'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: showMore ? 'unset' : 3,
                  overflow: 'hidden',
                }}
              >
                {service.serviceDesc}
              </span>
            </p>

            {isOverflowing && (
              <button
                onClick={() => setShowMore(!showMore)}
                className='text-blue-500 underline'
              >
                {showMore ? 'Ẩn bớt' : 'Hiển thị thêm'}
              </button>
            )}
          </div>
        </div>

        <Divider />

        {/* Khu vực biến thể dịch vụ */}
        <div className='flex items-center justify-between'>
          <h2 className='font-cute text-primary tracking-wide text-xl mb-2'>
            Các biến thể
          </h2>
          <button
            onClick={handleOpenAddVariantModal}
            className='bg-primary px-6 py-3 rounded-full text-white hover:text-tertiary-light hover:bg-primary-dark'
          >
            + Thêm biến thể
          </button>
        </div>

        <div className='pt-2'>
          <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
            {!service.serviceTypeName.toLowerCase().includes('dắt chó') ? (
              service.serviceVariants?.length > 0 ? (
                service.serviceVariants.map((variant, index) => (
                  <div
                    key={index}
                    className='relative border rounded-lg p-4 shadow bg-gray-50'
                  >
                    {/* Nội dung biến thể */}
                    <div className='space-y-1'>
                      {console.log(variant)}
                      <div className='flex items-center justify-between my-1'>
                        <p>
                          <strong>Giống:</strong> {variant.breedName}
                        </p>
                        <p>
                          <strong>Cân nặng:</strong> {variant.petWeightRange}
                        </p>
                      </div>
                      <div className='flex items-center justify-between my-1'>
                        <p>
                          <strong>Giá:</strong> {formatCurrency(variant.price)}
                        </p>
                        <p>
                          <strong>Ước tính:</strong> {variant.estimateTime}{' '}
                          tiếng
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
                          <IconButton
                            color='info'
                            onClick={() => handleOpenEditVariantModal(variant)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton color='error'>
                            <Delete />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Không tìm thấy biến thể phù hợp</p>
              )
            ) : finalWalkDogVariants?.length > 0 ? (
              finalWalkDogVariants?.map((variant, index) => (
                <div
                  key={index}
                  className='relative border rounded-lg p-4 shadow bg-gray-50'
                >
                  <div className='space-y-1'>
                    <div className='flex items-center justify-between my-1'>
                      <p>
                        <strong>Giống:</strong> {variant?.breedName}
                      </p>
                      <p>
                        <strong>Giá:</strong>{' '}
                        {formatCurrency(variant?.pricePerPeriod)}
                      </p>
                    </div>
                    <div className='flex items-center justify-between my-1'>
                      <p>
                        <strong>Thời gian thực hiện:</strong> {variant?.period}{' '}
                        giờ
                      </p>
                    </div>
                    <div className='flex items-center justify-between pt-4'>
                      <p className='py-4'>
                        {variant.isVisible ? (
                          <span className='bg-primary px-4 py-1 rounded-full text-white text-sm'>
                            Hiển thị
                          </span>
                        ) : (
                          <span className='bg-secondary-light px-8 py-2 rounded-full text-white'>
                            Đã ẩn
                          </span>
                        )}
                      </p>

                      <div>
                        <IconButton
                          color='info'
                          onClick={() => handleOpenEditVariantModal(variant)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton color='error'>
                          <Delete />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có biến thể nào được tìm thấy</p>
            )}
          </div>
        </div>
      </div>

      {showAddVariantModal &&
      !service.serviceTypeName.toLowerCase().includes('dắt chó') ? (
        <AddVariantModal
          open={showAddVariantModal}
          onClose={handleCloseAddVariantModal}
          serviceId={service.serviceId}
          onAddVariant={handleAddVariant}
        />
      ) : (
        <AddWalkDogVariantModal
          open={showAddVariantModal}
          onClose={handleCloseAddVariantModal}
          serviceId={service.serviceId}
          onAddVariant={handleAddVariant}
        />
      )}

      {showEditVariantModal && selectedVariant && (
        <EditVariantModal
          open={showEditVariantModal}
          onClose={handleCloseEditVariantModal}
          variant={selectedVariant}
          onUpdateVariant={handleUpdateVariant}
        />
      )}
    </CustomModal>
  );
};

export default ViewServiceDetailModal;
