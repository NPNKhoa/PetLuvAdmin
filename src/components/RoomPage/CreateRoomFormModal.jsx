import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem } from '@mui/material';
import { CloudUpload, DeleteForever } from '@mui/icons-material';
import CustomModal from '../common/CustomModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createRoom } from '../../redux/thunks/roomThunk';

const CreateRoomFormModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const roomTypes = useSelector((state) => state.roomTypes.roomTypes);

  const [imagePreviews, setImagePreviews] = useState([]);

  const formik = useFormik({
    initialValues: {
      roomName: '',
      roomDesc: '',
      isVisible: 'true',
      roomTypeId: '',
      pricePerHour: '',
      pricePerDay: '',
      roomImageUrls: [],
    },
    validationSchema: Yup.object({
      roomName: Yup.string().required('Tên phòng là bắt buộc'),
      roomDesc: Yup.string().required('Mô tả không được để trống'),
      isVisible: Yup.string().required('Trạng thái là bắt buộc'),
      roomTypeId: Yup.string().required('Chọn loại phòng'),
      pricePerHour: Yup.string().required('Giá theo giờ không được để trống'),
      pricePerDay: Yup.string().required('Giá theo ngày không được để trống'),
      roomImageUrls: Yup.array().min(1, 'Vui lòng tải lên ít nhất một ảnh'),
    }),
    onSubmit: (values) => {
      dispatch(createRoom(values))
        .unwrap()
        .then(() => toast.success('Thêm phòng thành công'))
        .catch((e) => toast.error(e));

      onClose();
    },
  });

  // Xử lý chọn ảnh & tạo preview
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue('roomImageUrls', files);

    // Tạo URL ảnh preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Xóa tất cả ảnh đã tải lên
  const handleClearImages = () => {
    formik.setFieldValue('roomImageUrls', []);
    setImagePreviews([]);
  };

  const handleClickImgInput = useCallback(() => {
    document.getElementById('upload-rooms-image').click();
  }, []);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Thêm phòng mới'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      <form className='space-y-4 p-4'>
        {/* Tên phòng */}
        <TextField
          label='Tên phòng'
          fullWidth
          {...formik.getFieldProps('roomName')}
          error={formik.touched.roomName && Boolean(formik.errors.roomName)}
          helperText={formik.touched.roomName && formik.errors.roomName}
        />

        {/* Mô tả phòng */}
        <TextField
          label='Mô tả phòng'
          fullWidth
          multiline
          rows={3}
          {...formik.getFieldProps('roomDesc')}
          error={formik.touched.roomDesc && Boolean(formik.errors.roomDesc)}
          helperText={formik.touched.roomDesc && formik.errors.roomDesc}
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

        {/* Loại phòng */}
        <TextField
          select
          label='Loại phòng'
          fullWidth
          {...formik.getFieldProps('roomTypeId')}
          error={formik.touched.roomTypeId && Boolean(formik.errors.roomTypeId)}
          helperText={formik.touched.roomTypeId && formik.errors.roomTypeId}
        >
          {roomTypes.map((type) => (
            <MenuItem key={type.roomTypeId} value={type.roomTypeId}>
              {type.roomTypeName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label='Giá theo giờ'
          fullWidth
          {...formik.getFieldProps('pricePerHour')}
          error={
            formik.touched.pricePerHour && Boolean(formik.errors.pricePerHour)
          }
          helperText={formik.touched.pricePerHour && formik.errors.pricePerHour}
        />

        <TextField
          label='Giá theo ngày'
          fullWidth
          {...formik.getFieldProps('pricePerDay')}
          error={
            formik.touched.pricePerDay && Boolean(formik.errors.pricePerDay)
          }
          helperText={formik.touched.pricePerDay && formik.errors.pricePerDay}
        />

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
              id='upload-rooms-image'
              type='file'
              multiple
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
            />
          </div>

          {/* Hiển thị lỗi khi chưa có ảnh */}
          {formik.touched.roomImageUrls && formik.errors.roomImageUrls && (
            <p className='text-red-500 text-sm'>
              {formik.errors.roomImageUrls}
            </p>
          )}

          {/* Hiển thị ảnh preview + nút xóa ảnh */}
          {imagePreviews.length > 0 && (
            <div>
              <div className='flex gap-2 mt-4 items-center'>
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
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

export default CreateRoomFormModal;
