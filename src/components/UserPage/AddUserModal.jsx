import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FaUpload, FaUser } from 'react-icons/fa';
import CustomModal from '../common/CustomModal';
import { register } from '../../redux/thunks/userThunk';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AddUserModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: null,
      gender: true, // Default to male
      avatar: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Họ và tên không được để trống')
        .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
        .max(50, 'Họ và tên không được vượt quá 50 ký tự'),
      email: Yup.string()
        .email('Email không hợp lệ')
        .required('Email không được để trống'),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được để trống'),
      address: Yup.string()
        .required('Địa chỉ không được để trống')
        .min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
      dateOfBirth: Yup.date()
        .max(new Date(), 'Ngày sinh không thể là ngày trong tương lai')
        .required('Ngày sinh không được để trống'),
      gender: Yup.boolean().required('Giới tính không được để trống'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      console.log(values);

      try {
        // await dispatch(createUser(formData)).unwrap();
        dispatch(register(values))
          .unwrap()
          .then(() => {
            toast.success('Thêm người dùng thành công!');
            formik.resetForm();
            setAvatarPreview(null);
            onClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error(
              error?.message ||
                error ||
                'Thêm người dùng thất bại. Vui lòng thử lại!'
            );
            onClose();
          });
      } catch (error) {
        console.error('Error creating user:', error);
        toast.error(
          error?.message || 'Thêm người dùng thất bại. Vui lòng thử lại!'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      onConfirm={formik.handleSubmit}
      confirmTextButton='Lưu'
      title='Thêm người dùng mới'
      maxWidth='md'
      fullWidth
    >
      <div className='p-6'>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-6'>
              {/* Avatar Upload */}
              <div className='flex flex-col items-center'>
                <div className='w-40 h-40 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden mb-3 relative group'>
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt='Avatar preview'
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <FaUser className='text-gray-400 text-5xl' />
                  )}
                  <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <label
                      htmlFor='avatar-upload'
                      className='cursor-pointer text-white flex flex-col items-center'
                    >
                      <FaUpload className='text-2xl mb-1' />
                      <span className='text-sm'>Tải ảnh lên</span>
                    </label>
                  </div>
                </div>
                <input
                  id='avatar-upload'
                  name='avatar'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Gender Selection */}
              <FormControl component='fieldset' className='w-full'>
                <FormLabel
                  component='legend'
                  className='text-gray-700 font-medium mb-2'
                >
                  Giới tính
                </FormLabel>
                <RadioGroup
                  row
                  name='gender'
                  value={formik.values.gender}
                  onChange={(e) =>
                    formik.setFieldValue('gender', e.target.value === 'true')
                  }
                  className='justify-center'
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color='primary' />}
                    label='Nam'
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color='primary' />}
                    label='Nữ'
                  />
                </RadioGroup>
                {formik.touched.gender && formik.errors.gender && (
                  <div className='text-red-500 text-sm mt-1'>
                    {formik.errors.gender}
                  </div>
                )}
              </FormControl>
            </div>

            <div className='space-y-4'>
              <TextField
                label='Họ và tên'
                fullWidth
                {...formik.getFieldProps('fullName')}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                label='Email'
                fullWidth
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                label='Số điện thoại'
                fullWidth
                {...formik.getFieldProps('phoneNumber')}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />

              <TextField
                label='Địa chỉ'
                fullWidth
                {...formik.getFieldProps('address')}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Ngày sinh'
                    value={
                      formik.values.dateOfBirth
                        ? dayjs(formik.values.dateOfBirth)
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue('dateOfBirth', date)
                    }
                    className='w-full'
                  />
                </LocalizationProvider>
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <div className='text-red-500 text-sm mt-1'>
                    {formik.errors.dateOfBirth}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddUserModal;
