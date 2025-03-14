import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem } from '@mui/material';
import { CloudUpload, DeleteForever } from '@mui/icons-material';
import CustomModal from '../common/CustomModal';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateRoom } from '../../redux/thunks/roomThunk';

const UpdateRoomFormModal = ({ open, onClose, room }) => {
  const dispatch = useDispatch();
  const roomTypes = useSelector((state) => state.roomTypes.roomTypes);

  const [imagePreviews, setImagePreviews] = useState(room?.roomImageUrls || []);

  const formik = useFormik({
    initialValues: {
      roomName: room?.roomName || '',
      roomDesc: room?.roomDesc || '',
      isVisible: room?.isVisible ? 'true' : 'false',
      roomTypeId: room?.roomTypeId || '',
      pricePerHour: room?.pricePerHour || '',
      pricePerDay: room?.pricePerDay || '',
      roomImageUrls: room?.roomImageUrls || [],
    },
    enableReinitialize: true,
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
      const updatedRoom = { ...room, ...values };
      dispatch(updateRoom(updatedRoom))
        .unwrap()
        .then(() => toast.success('Cập nhật phòng thành công'))
        .catch((e) => toast.error(e));
      onClose();
    },
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue('roomImageUrls', files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

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
      title='Cập nhật phòng'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      <form className='space-y-4 p-4'>
        <TextField
          label='Tên phòng'
          fullWidth
          {...formik.getFieldProps('roomName')}
        />
        <TextField
          label='Mô tả phòng'
          fullWidth
          multiline
          rows={3}
          {...formik.getFieldProps('roomDesc')}
        />
        <TextField
          select
          label='Trạng thái'
          fullWidth
          {...formik.getFieldProps('isVisible')}
        >
          <MenuItem value='true'>Hiển thị</MenuItem>
          <MenuItem value='false'>Ẩn</MenuItem>
        </TextField>
        <TextField
          select
          label='Loại phòng'
          fullWidth
          {...formik.getFieldProps('roomTypeId')}
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
        />
        <TextField
          label='Giá theo ngày'
          fullWidth
          {...formik.getFieldProps('pricePerDay')}
        />
        <div className='space-y-2'>
          <label className='block font-medium'>Tải lên ảnh</label>
          <div
            onClick={handleClickImgInput}
            className='border-2 border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer'
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
          {formik.touched.roomImageUrls && formik.errors.roomImageUrls && (
            <p className='text-red-500 text-sm'>
              {formik.errors.roomImageUrls}
            </p>
          )}
          {imagePreviews.length > 0 && (
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
                <DeleteForever /> Xóa tất cả ảnh
              </button>
            </div>
          )}
        </div>
      </form>
    </CustomModal>
  );
};

export default UpdateRoomFormModal;
