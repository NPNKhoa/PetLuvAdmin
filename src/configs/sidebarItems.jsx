import {
  RiServiceFill,
  RiHotelFill,
  RiCalendarScheduleFill,
} from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';
import { FaUsers, FaDog, FaUserLock, FaChartPie } from 'react-icons/fa6';
import { IoGrid } from 'react-icons/io5';
import { BiSolidCategory } from 'react-icons/bi';

export default [
  { name: 'Trang chủ', icon: <FaChartPie size={20} />, path: '/' },
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
  // {
  //   name: 'Quản lý thú cưng',
  //   icon: <FaDog size={20} />,
  //   path: '/quan-ly-thu-cung',
  // },
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
    name: 'Quản lý Danh mục',
    icon: <BiSolidCategory size={20} />,
    path: '/quan-ly-danh-muc',
  },
  // {
  //   name: 'Quản lý Phân quyền',
  //   icon: <FaUserLock size={20} />,
  //   path: '/quan-ly-phan-quyen',
  // },
];
