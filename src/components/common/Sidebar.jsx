import { useSpring, animated } from '@react-spring/web';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import sidebarItems from '../../configs/sidebarItems.jsx';
import { useMemo } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarSpring = useSpring({ width: isOpen ? 250 : 80 });

  const location = useLocation();

  const currentPage = useMemo(
    () => sidebarItems.find((item) => item.path === location.pathname)?.name,
    [location]
  );

  return (
    <animated.aside
      style={sidebarSpring}
      className='bg-primary-light text-white h-screen flex flex-col p-4'
    >
      <div
        className={`flex items-center justify-between ${
          isOpen ? '-mt-4' : 'mt-2'
        }`}
      >
        <div className='mx-auto'>
          <img
            src='/logo.png'
            alt='PetLuv'
            className={`${isOpen ? 'md:w-24 sm:w-16' : 'md:w-32 sm:w-24'}`}
          />
        </div>
        <button
          onClick={toggleSidebar}
          className={`text-white ${isOpen ? '-mt-6' : 'ms-1'}`}
        >
          <MdMenu
            size={isOpen ? 24 : 20}
            className='hover:text-tertiary-light'
          />
        </button>
      </div>
      <nav className='mt-10 flex flex-col gap-3 overflow-y-auto'>
        {sidebarItems?.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 p-4 rounded-lg hover:bg-primary-dark transition-all ${
              currentPage === item.name && 'bg-secondary'
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </animated.aside>
  );
};

export default Sidebar;
