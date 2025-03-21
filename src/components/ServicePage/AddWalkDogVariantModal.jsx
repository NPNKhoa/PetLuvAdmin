import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../common/CustomModal';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';

const AddWalkDogVariantModal = ({ open, onClose, serviceId, onAddVariant }) => {
  const petBreeds = useSelector((state) => state.petBreeds.petBreeds);

  const formik = useFormik({
    initialValues: {
      serviceId,
      breedId: '',
      pricePerPeriod: '',
      period: '',
      isVisible: 'true',
    },
    validationSchema: Yup.object({
      breedId: Yup.string().required('Vui lòng chọn giống'),
      pricePerPeriod: Yup.number()
        .typeError('Phải là số')
        .positive('Giá phải lớn hơn 0')
        .required('Vui lòng nhập giá'),
      period: Yup.number()
        .typeError('Phải là số')
        .positive('Thời gian phải lớn hơn 0')
        .required('Vui lòng nhập Thời gian'),
      isVisible: Yup.string().required('Vui lòng chọn trạng thái'),
    }),
    onSubmit: (values) => {
      const updatedVariant = {
        ...values,
        breedName: petBreeds.find((item) => item.breedId === values.breedId)
          ?.breedName,
        isVisible: values.isVisible === 'true',
      };

      onAddVariant(updatedVariant, updatedVariant);
      onClose();
    },
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Thêm biến thể dịch vụ dắt chó'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
    >
      {!Array.isArray(petBreeds) || petBreeds.length === 0 ? (
        <p className='text-center font-cute tracking-wider text-xl text-primary my-8'>
          Dữ liệu không hợp lệ, vui lòng thử lại sau!
        </p>
      ) : (
        <form className='space-y-4 p-4'>
          <TextField
            select
            fullWidth
            label='Chọn giống'
            {...formik.getFieldProps('breedId')}
            error={formik.touched.breedId && Boolean(formik.errors.breedId)}
            helperText={formik.touched.breedId && formik.errors.breedId}
          >
            {petBreeds.map((breed) => (
              <MenuItem key={breed.breedId} value={breed.breedId}>
                {breed.breedName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label='Giá'
            type='number'
            {...formik.getFieldProps('pricePerPeriod')}
            onWheel={(e) => e.target.blur()}
            error={
              formik.touched.pricePerPeriod &&
              Boolean(formik.errors.pricePerPeriod)
            }
            helperText={
              formik.touched.pricePerPeriod && formik.errors.pricePerPeriod
            }
            InputProps={{
              endAdornment: <InputAdornment position='end'>VNĐ</InputAdornment>,
            }}
          />

          <TextField
            fullWidth
            label='Thời gian thực hiện'
            type='number'
            {...formik.getFieldProps('period')}
            onWheel={(e) => e.target.blur()}
            error={formik.touched.period && Boolean(formik.errors.period)}
            helperText={formik.touched.period && formik.errors.period}
            InputProps={{
              endAdornment: <InputAdornment position='end'>Giờ</InputAdornment>,
            }}
          />

          <TextField
            select
            fullWidth
            label='Trạng thái'
            {...formik.getFieldProps('isVisible')}
            error={formik.touched.isVisible && Boolean(formik.errors.isVisible)}
            helperText={formik.touched.isVisible && formik.errors.isVisible}
          >
            <MenuItem value='true'>Hiển thị</MenuItem>
            <MenuItem value='false'>Ẩn</MenuItem>
          </TextField>
        </form>
      )}
    </CustomModal>
  );
};

export default AddWalkDogVariantModal;
