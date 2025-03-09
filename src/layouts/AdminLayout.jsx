import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import React, { useState } from 'react';
import { Header, Sidebar } from '../components';

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentSpring = useSpring({});

  return (
    <div className='flex'>
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <animated.div
        style={contentSpring}
        className='flex-1 flex flex-col max-h-screen overflow-y-auto'
      >
        <Header />
        <main className='p-6 flex-1 bg-gray-100'>{children}</main>
      </animated.div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
