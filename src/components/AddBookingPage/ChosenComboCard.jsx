import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const ChosenComboCard = ({ combo, onClick }) => {
  return (
    <div className='bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:cursor-pointer'>
      <div className='p-4 relative'>
        <h3 className='text-lg font-bold text-primary text-start line-clamp-1'>
          <Tooltip title={combo?.serviceComboName} placement='bottom'>
            {combo?.serviceComboName}
          </Tooltip>
        </h3>
        <p className='text-sm text-gray-500 mt-2 line-clamp-2 text-start'>
          <Tooltip title={combo?.serviceComboDesc} placement='bottom'>
            {combo?.serviceComboDesc}
          </Tooltip>
        </p>

        <button
          onClick={() => onClick()}
          className='bg-primary w-full py-2 rounded-full text-white mt-6 hover:bg-primary-dark'
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

ChosenComboCard.propTypes = {
  combo: PropTypes.shape({
    serviceComboId: PropTypes.string.isRequired,
    serviceComboName: PropTypes.string.isRequired,
    serviceComboDesc: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChosenComboCard;
