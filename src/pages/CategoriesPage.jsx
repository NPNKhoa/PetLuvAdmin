import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  FaPaw,
  FaDog,
  FaClipboardList,
  FaCalendarCheck,
  FaDoorOpen,
  FaCreditCard,
  FaMoneyCheckAlt,
} from 'react-icons/fa';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === '/quan-ly-danh-muc';

  const categories = [
    {
      id: 'pet-type',
      name: 'Loại Thú Cưng',
      icon: <FaPaw className='text-4xl mb-3 text-primary' />,
      path: 'loai-thu-cung',
    },
    {
      id: 'pet-breed',
      name: 'Giống Thú Cưng',
      icon: <FaDog className='text-4xl mb-3 text-primary' />,
      path: 'giong-thu-cung',
    },
    {
      id: 'service-type',
      name: 'Loại Dịch Vụ',
      icon: <FaClipboardList className='text-4xl mb-3 text-primary' />,
      path: 'loai-dich-vu',
    },
    {
      id: 'room-type',
      name: 'Loại Phòng',
      icon: <FaDoorOpen className='text-4xl mb-3 text-primary' />,
      path: 'loai-phong',
    },
    {
      id: 'booking-status',
      name: 'Trạng Thái Lịch Hẹn',
      icon: <FaCalendarCheck className='text-4xl mb-3 text-primary' />,
      path: 'trang-thai-lich-hen',
    },
    {
      id: 'payment-method',
      name: 'Phương Thức Thanh Toán',
      icon: <FaCreditCard className='text-4xl mb-3 text-primary' />,
      path: 'phuong-thuc-thanh-toan',
    },
    {
      id: 'payment-status',
      name: 'Trạng Thái Thanh Toán',
      icon: <FaMoneyCheckAlt className='text-4xl mb-3 text-primary' />,
      path: 'trang-thai-thanh-toan',
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className='p-6'>
      {isRootPath ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleNavigate(category.path)}
              className='flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-tertiary-light hover:border-primary transform hover:-translate-y-1'
            >
              {category.icon}
              <h3 className='text-xl font-semibold text-center text-secondary'>
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default CategoriesPage;
