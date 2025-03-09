import {
  RiServiceFill,
  RiHotelFill,
  RiCalendarScheduleFill,
} from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';
import { FaUsers, FaDog, FaUserLock } from 'react-icons/fa6';
import { IoGrid } from 'react-icons/io5';
import { GiOpenedFoodCan } from 'react-icons/gi';

export default [
  { name: 'Trang chủ', icon: <MdDashboard size={20} />, path: '/' },
  {
    name: 'Quản lý Dịch vụ',
    icon: <RiServiceFill size={20} />,
    path: '/quan-ly-dich-vu',
  },
  {
    name: 'Quản lý Combo',
    icon: <IoGrid size={20} />,
    path: '/quan-ly-combo',
  },
  {
    name: 'Quản lý phòng',
    icon: <RiHotelFill size={20} />,
    path: '/quan-ly-phong',
  },
  {
    name: 'Quản lý sản phẩm',
    icon: <GiOpenedFoodCan size={20} />,
    path: '/quan-ly-san-pham',
  },
  {
    name: 'Quản lý thú cưng',
    icon: <FaDog size={20} />,
    path: '/quan-ly-thu-cung',
  },
  {
    name: 'Quản lý Người dùng',
    icon: <FaUsers size={20} />,
    path: '/quan-ly-nguoi-dung',
  },
  {
    name: 'Quản lý Booking',
    icon: <RiCalendarScheduleFill size={20} />,
    path: '/quan-ly-booking',
  },
  {
    name: 'Quản lý Phân quyền',
    icon: <FaUserLock size={20} />,
    path: '/quan-ly-phan-quyen',
  },
];
