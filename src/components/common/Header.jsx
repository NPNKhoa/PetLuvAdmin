import { Avatar, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import sidebarItems from '../../configs/sidebarItems';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPage = useMemo(
    () => sidebarItems.find((item) => item.path === location.pathname)?.name,
    [location]
  );

  return (
    <header className='bg-secondary text-white flex justify-between items-center p-4 shadow-md'>
      <span className='text-xl font-cute tracking-wider'>{currentPage}</span>
      <div className='flex items-center gap-3 me-4 md:w-[12rem] hover:cursor-pointer'>
        <Avatar alt='User' src='/user-avatar.png' />
        <span className='font-medium md:max-w-[8rem] truncate'>
          Nguyễn Khoa Admin
        </span>
        <button onClick={() => dispatch(logout())}>
          <Tooltip title='Đăng xuất'>
            <FiLogOut className='w-4 h-4 hover:opacity-90 text-primary' />
          </Tooltip>
        </button>
      </div>
    </header>
  );
};

export default Header;
