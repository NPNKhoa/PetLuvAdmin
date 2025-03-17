import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../common/CustomModal';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';

const EditVariantModal = ({ open, onClose, variant, onUpdateVariant }) => {
  const petBreeds = useSelector((state) => state.petBreeds.petBreeds);

  const formik = useFormik({
    initialValues: {
      serviceId: variant.serviceId,
      breedId: variant.breedId || '',
      petWeightRange: variant.petWeightRange?.replace('kg', '') || '',
      price: variant.price || '',
      estimateTime: variant.estimateTime || '',
      isVisible: variant.isVisible ? 'true' : 'false',
    },
    validationSchema: Yup.object({
      breedId: Yup.string().required('Vui lòng chọn giống'),
      petWeightRange: Yup.string()
        .matches(/^\d+ - \d+$/, 'Vui lòng nhập đúng định dạng (VD: 0 - 5)')
        .required('Vui lòng nhập khoảng cân nặng'),
      price: Yup.number()
        .typeError('Phải là số')
        .positive('Giá phải lớn hơn 0')
        .required('Vui lòng nhập giá'),
      estimateTime: Yup.number()
        .typeError('Phải là số')
        .integer('Chỉ nhập số nguyên')
        .min(0, 'Thời gian phải >= 0')
        .required('Vui lòng nhập thời gian'),
      isVisible: Yup.string().required('Vui lòng chọn trạng thái'),
    }),
    onSubmit: (values) => {
      onUpdateVariant({
        ...values,
        petWeightRange: values.petWeightRange + 'kg',
        isVisible: values.isVisible === 'true',
      });
      onClose();
    },
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Chỉnh sửa biến thể'
      onConfirm={formik.handleSubmit}
      confirmTextButton='Cập nhật'
    >
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
          label='Khoảng cân nặng'
          placeholder='VD: 0 - 5'
          {...formik.getFieldProps('petWeightRange')}
          error={
            formik.touched.petWeightRange &&
            Boolean(formik.errors.petWeightRange)
          }
          helperText={
            formik.touched.petWeightRange && formik.errors.petWeightRange
          }
          InputProps={{
            endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
          }}
        />

        <TextField
          fullWidth
          label='Giá'
          type='number'
          {...formik.getFieldProps('price')}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          InputProps={{ inputProps: { step: 1, min: 0 } }} // Ngăn thay đổi khi cuộn
        />

        <TextField
          fullWidth
          label='Thời gian ước tính (giờ)'
          type='number'
          {...formik.getFieldProps('estimateTime')}
          error={
            formik.touched.estimateTime && Boolean(formik.errors.estimateTime)
          }
          helperText={formik.touched.estimateTime && formik.errors.estimateTime}
          InputProps={{ inputProps: { step: 1, min: 0 } }} // Chỉ cho số nguyên, ngăn scroll
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
    </CustomModal>
  );
};

export default EditVariantModal;
