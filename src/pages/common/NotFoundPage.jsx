import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <img
        src='/not-found-cat.gif'
        alt='Not Found Cat'
        className='sm:w-1/2 md:w-1/3 lg:w-1/5 mb-8'
      />

      <h1 className='text-6xl font-semibold text-center text-primary mb-4'>
        404
      </h1>
      <p className='text-xl text-center text-primary-dark'>
        Trang bạn yêu cầu không tồn tại. Vui lòng kiểm tra đường dẫn
      </p>

      <Link
        to={'/'}
        className='mt-8 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-300'
      >
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
