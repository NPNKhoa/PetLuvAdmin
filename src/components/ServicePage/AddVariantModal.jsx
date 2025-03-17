import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../common/CustomModal';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';

const AddVariantModal = ({ open, onClose, serviceId, onAddVariant }) => {
  const petBreeds = useSelector((state) => state.petBreeds.petBreeds);

  const formik = useFormik({
    initialValues: {
      serviceId,
      breedId: '',
      petWeightRange: '',
      price: '',
      estimateTime: '',
      isVisible: 'true',
    },
    validationSchema: Yup.object({
      breedId: Yup.string().required('Vui lòng chọn giống'),
      petWeightRange: Yup.string()
        .matches(
          /^\d+ - \d+$/,
          'Vui lòng nhập đúng định dạng yêu cầu (VD: 0 - 5)'
        )
        .required('Vui lòng nhập khoảng cân nặng'),
      price: Yup.number()
        .typeError('Phải là số')
        .positive('Giá phải lớn hơn 0')
        .required('Vui lòng nhập giá'),
      estimateTime: Yup.number()
        .typeError('Phải là số nguyên')
        .integer('Thời gian phải là số nguyên')
        .min(0, 'Thời gian phải >= 0'),
      isVisible: Yup.string().required('Vui lòng chọn trạng thái'),
    }),
    onSubmit: (values) => {
      const updatingVariant = {
        ...values,
        breedName: petBreeds.find((item) => item.breedId === values.breedId)
          .breedName,
      };

      onAddVariant(
        {
          ...values,
          petWeightRange: values.petWeightRange + 'kg',
          isVisible: values.isVisible === 'true',
        },
        updatingVariant
      );

      onClose();
    },
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title='Thêm biến thể'
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
            onWheel={(e) => e.target.blur()}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <TextField
            fullWidth
            label='Thời gian ước tính (giờ)'
            type='number'
            inputProps={{ step: 0.5 }}
            {...formik.getFieldProps('estimateTime')}
            onWheel={(e) => e.target.blur()}
            error={
              formik.touched.estimateTime && Boolean(formik.errors.estimateTime)
            }
            helperText={
              formik.touched.estimateTime && formik.errors.estimateTime
            }
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

export default AddVariantModal;
