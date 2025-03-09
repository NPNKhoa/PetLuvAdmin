import { useSpring, animated } from '@react-spring/web';

const LoadingPage = () => {
  const textStyle = useSpring({
    from: { color: '#f79400' },
    to: { color: '#d87a00' },
    loop: { reverse: true },
    config: { duration: 2000 },
  });

  return (
    <div className='flex justify-center items-center h-screen flex-col gap-2'>
      <img src='./loading-cat.gif' className='w-36 h-36 rounded-full' />
      <animated.div style={textStyle} className='text-2xl font-semibold'>
        Loading... Please wait!
      </animated.div>
    </div>
  );
};

export default LoadingPage;
