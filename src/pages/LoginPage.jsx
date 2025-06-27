import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CircularProgress, Divider, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { login } from '../redux/thunks/authThunk';
import MyAlrt from '../configs/alert/MyAlrt';
import { clearError } from '../redux/slices/authSlice';

const LoginPage = () => {
  const credentialsValue = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Không được bỏ trống'),
    password: Yup.string()
      .min(6, 'Mật khẩu ít nhất 8 ký tự')
      .required('Không được bỏ trống'),
  });

  const handleSubmit = async (values) => {
    dispatch(login(values))
      .unwrap()
      .then((data) => {
        if (data.user.staffType === 'user' || data.user.staffType === '') {
          toast.error('Bạn không có quyền truy cập vào trang này');
          navigate('/dang-nhap');
          return;
        }
        toast.success('Đăng nhập thành công');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || error);
      });
  };

  useEffect(() => {
    if (error) {
      MyAlrt.Error('Lỗi', error, 'Xác nhận', false, 'Đóng', () => {
        dispatch(clearError());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (user !== null && localStorage.getItem('token') !== null) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className='bg-gray-100 p-8'>
      <div className='-mb-12'>
        <h1 className='font-cute trackingwider text-primary text-3xl text-center mb-2'>
          Chào mừng đến với trang quản trị
        </h1>
        <h2 className='font-cute trackingwider text-secondary text-2xl text-center'>
          Vui lòng đăng nhập để tiếp tục
        </h2>
      </div>
      <div className='flex items-center justify-center min-h-screen'>
        <Stack spacing={2} className='bg-white p-6 rounded-lg shadow-md w-96'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Đăng nhập</h2>
          <Formik
            initialValues={credentialsValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <Field
                    type='email'
                    name='email'
                    id='email'
                    className='mt-1 block w-full rounded-md border-primary-dark shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mật khẩu
                  </label>
                  <Field
                    type='password'
                    name='password'
                    id='password'
                    className='mt-1 block w-full rounded-md border-primary-dark shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>
                <p className='text-primary text-right hover:text-primary-dark hover:cursor-pointer'>
                  Quên mật khẩu?
                </p>
                <button
                  disabled={loading}
                  type='submit'
                  className={`w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 mt-4 rounded ${
                    loading && 'hover:cursor-not-allowed bg-primary-dark'
                  }`}
                >
                  {loading ? (
                    <CircularProgress size={'1rem'} color='secondary' />
                  ) : (
                    'Đăng nhập'
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <p className='text-center'>
            Bạn chưa có tài khoản?{' '}
            <Link
              to={'/dang-ky'}
              className='text-center text-primary hover:text-primary-dark'
            >
              Đăng ký ngay
            </Link>
          </p>
          <Divider>
            <span className='text-tertiary-dark'>hoặc đăng nhập với</span>
          </Divider>
          <Stack
            spacing={4}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <FaFacebook
              color='blue'
              size={35}
              className='hover:cursor-pointer hover:opacity-85'
            />
            <FcGoogle
              size={35}
              className='hover:cursor-pointer hover:opacity-85'
            />
          </Stack>
        </Stack>
      </div>
    </main>
  );
};

export default LoginPage;
