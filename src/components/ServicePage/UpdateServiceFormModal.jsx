import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem } from '@mui/material';
import { CloudUpload, DeleteForever } from '@mui/icons-material';
import CustomModal from '../common/CustomModal';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateService } from '../../redux/thunks/serviceThunk';

const UpdateServiceFormModal = ({ open, onClose, service }) => {
  const dispatch = useDispatch();
  const serviceTypes = useSelector((state) => state.serviceTypes.serviceTypes);

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (service?.serviceImageUrls) {
      setImagePreviews(service.serviceImageUrls);
    }
  }, [service]);

  const formik = useFormik({
    initialValues: {
      serviceName: service?.serviceName || '',
      serviceDesc: service?.serviceDesc || '',
      isVisible: service?.isVisible ? 'true' : 'false',
      serviceTypeId: service?.serviceTypeId || '',
      serviceImageUrls: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      serviceName: Yup.string().required('Tên dịch vụ là bắt buộc'),
      serviceDesc: Yup.string().required('Mô tả không được để trống'),
      isVisible: Yup.string().required('Trạng thái là bắt buộc'),
      serviceTypeId: Yup.string().required('Chọn loại dịch vụ'),
    }),
    onSubmit: (values) => {
      const updatedService = {
        ...service,
        ...values,
      };

      dispatch(updateService(updatedService))
        .unwrap()
        .then(() => toast.success('Cập nhật dịch vụ thành công'))
        .catch((e) => toast.error(e));

      onClose();
    },
  });

  // Xử lý tải ảnh lên
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue('serviceImageUrls', files);

    // Tạo URL ảnh preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Xóa tất cả ảnh đã tải lên
  const handleClearImages = () => {
    formik.setFieldValue('serviceImageUrls', []);
    setImagePreviews([]);
  };

  const handleClickImgInput = useCallback(() => {
    document.getElementById('upload-services-image').click();
  }, []);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Cập nhật dịch vụ'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      <form className='space-y-4 p-4'>
        {/* Tên dịch vụ */}
        <TextField
          label='Tên dịch vụ'
          fullWidth
          {...formik.getFieldProps('serviceName')}
          error={
            formik.touched.serviceName && Boolean(formik.errors.serviceName)
          }
          helperText={formik.touched.serviceName && formik.errors.serviceName}
        />

        {/* Mô tả dịch vụ */}
        <TextField
          label='Mô tả dịch vụ'
          fullWidth
          multiline
          rows={3}
          {...formik.getFieldProps('serviceDesc')}
          error={
            formik.touched.serviceDesc && Boolean(formik.errors.serviceDesc)
          }
          helperText={formik.touched.serviceDesc && formik.errors.serviceDesc}
        />

        {/* Trạng thái hiển thị */}
        <TextField
          select
          label='Trạng thái'
          fullWidth
          {...formik.getFieldProps('isVisible')}
          error={formik.touched.isVisible && Boolean(formik.errors.isVisible)}
          helperText={formik.touched.isVisible && formik.errors.isVisible}
        >
          <MenuItem value='true'>Hiển thị</MenuItem>
          <MenuItem value='false'>Ẩn</MenuItem>
        </TextField>

        {/* Loại dịch vụ */}
        <TextField
          select
          label='Loại dịch vụ'
          fullWidth
          {...formik.getFieldProps('serviceTypeId')}
          error={
            formik.touched.serviceTypeId && Boolean(formik.errors.serviceTypeId)
          }
          helperText={
            formik.touched.serviceTypeId && formik.errors.serviceTypeId
          }
        >
          {serviceTypes.map((type) => (
            <MenuItem key={type.serviceTypeId} value={type.serviceTypeId}>
              {type.serviceTypeName}
            </MenuItem>
          ))}
        </TextField>

        {/* Upload Ảnh */}
        <div className='space-y-2'>
          <label className='block font-medium'>Tải lên ảnh</label>

          {/* Ô tải ảnh */}
          <div
            onClick={handleClickImgInput}
            className='border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100'
          >
            <CloudUpload className='text-gray-500 text-4xl' />
            <p className='text-sm text-gray-500'>Nhấn để chọn ảnh</p>
            <input
              id='upload-services-image'
              type='file'
              multiple
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
            />
          </div>

          {/* Hiển thị ảnh preview */}
          {imagePreviews.length > 0 && (
            <div>
              <div className='flex gap-2 mt-4 items-center'>
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_API_BASE_URL}${src}`}
                    alt='Preview'
                    className='w-20 h-20 object-cover rounded-lg shadow-md'
                  />
                ))}

                <button
                  type='button'
                  onClick={handleClearImages}
                  className='ms-8 flex items-center gap-1 text-red-500 hover:opacity-80'
                >
                  <DeleteForever />
                  Xóa tất cả ảnh
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </CustomModal>
  );
};

export default UpdateServiceFormModal;
