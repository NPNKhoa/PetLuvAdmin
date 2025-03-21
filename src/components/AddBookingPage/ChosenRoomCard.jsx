import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ChosenRoomCard = ({ room, onClick }) => {
  return (
    <div className='bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:cursor-pointer'>
      <img
        src={`${
          !Array.isArray(room?.roomImages) || room?.roomImages.length === 0
            ? '/logo.png'
            : 'http://localhost:5020' + room?.roomImages[0]
        }`}
        alt={room?.roomName}
        className='w-full h-48 object-cover'
      />

      <div className='p-4 text-start'>
        <h3 className='text-lg font-bold text-gray-800'>{room?.roomName}</h3>
        <p className='text-sm text-gray-500 mt-2 line-clamp-2'>
          {room?.roomDesc}
        </p>

        <div className='flex justify-between items-center mt-4'>
          <span
            className={`inline-block mt-3 text-xs text-white ${
              room?.roomTypeName && 'bg-primary'
            } px-3 py-1 rounded-full`}
          >
            {room?.roomTypeName}
          </span>

          <IconButton data-id={room?.roomId} onClick={onClick} color='primary'>
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

ChosenRoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChosenRoomCard;
