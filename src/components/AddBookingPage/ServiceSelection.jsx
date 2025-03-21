import { TextField } from '@mui/material';
import ChosenComboCard from './ChosenComboCard';
import ChosenRoomCard from './ChosenRoomCard';
import ChosenServiceCard from './ChosenServiceCard';

const ServiceSelection = ({
  services,
  onChooseService,
  combos,
  onChooseCombo,
  rooms,
  onChooseRoom,
  search,
  onSearch,
}) => {
  return (
    <>
      <h3 className='text-2xl text-secondary font-semibold'>
        Chọn dịch vụ hoặc phòng
      </h3>
      <TextField
        label='Nhập tên dịch vụ...'
        type='text'
        value={search}
        onChange={onSearch}
        className='w-1/2 mx-auto ms-auto'
      />
      <div className='grid grid-cols-4 gap-4'>
        {Array.isArray(services) && services.length !== 0 ? (
          services.map((service) => (
            <ChosenServiceCard
              key={`service-${service.serviceId}`}
              service={service}
              onClick={() => onChooseService(service.serviceId)}
            />
          ))
        ) : Array.isArray(combos) && combos.length !== 0 ? (
          combos.map((combo) => (
            <ChosenComboCard
              key={`combo-${combo.serviceId}`}
              combo={combo}
              onClick={onChooseCombo}
            />
          ))
        ) : Array.isArray(rooms) && rooms.length !== 0 ? (
          rooms.map((room) => (
            <ChosenRoomCard
              key={`room-${room.serviceId}`}
              room={room}
              onClick={onChooseRoom}
            />
          ))
        ) : (
          <p className='my-8 text-2xl text-primary font-cute tracking-wider'>
            Không tìm thấy !!!
          </p>
        )}
      </div>
    </>
  );
};

export default ServiceSelection;
