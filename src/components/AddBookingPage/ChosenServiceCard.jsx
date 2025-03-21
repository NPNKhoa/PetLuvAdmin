import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ChosenServiceCard = ({ service, onClick }) => {
  return (
    <div className='bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:cursor-pointer'>
      <img
        src={`${
          !Array.isArray(service?.serviceImageUrls) ||
          service?.serviceImageUrls.length === 0
            ? '/logo.png'
            : 'http://localhost:5020' + service?.serviceImageUrls[0]
        }`}
        alt={service?.serviceName}
        className='w-full h-48 object-cover'
      />

      <div className='p-4 text-start'>
        <h3 className='text-lg font-bold text-gray-800'>
          {service?.serviceName}
        </h3>
        <p className='text-sm text-gray-500 mt-2 line-clamp-2'>
          {service?.serviceDesc}
        </p>

        <div className='flex justify-between items-center mt-4'>
          <span
            className={`inline-block mt-3 text-xs text-white ${
              service?.serviceTypeName && 'bg-primary'
            } px-3 py-1 rounded-full`}
          >
            {service?.serviceTypeName}
          </span>

          <IconButton
            data-id={service?.serviceId}
            onClick={onClick}
            color='primary'
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

ChosenServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChosenServiceCard;
