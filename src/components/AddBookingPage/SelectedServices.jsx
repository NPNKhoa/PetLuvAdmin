const SelectedServices = ({ services, selectedService, onSelectService }) => {
  return (
    <div className='p-4 border-r border-gray-300'>
      <h2 className='text-lg font-bold mb-3'>Chọn dịch vụ</h2>
      <ul>
        {services?.map((service, index) => (
          <li
            key={service.serviceId}
            className={`cursor-pointer p-2 rounded-md my-2 ${
              selectedService?.serviceId === service.serviceId
                ? 'bg-primary text-white'
                : 'hover:bg-primary-dark hover:text-white'
            }`}
            onClick={() => onSelectService(service.serviceId)}
          >
            <div className='flex items-center justify-between'>
              <p>
                {index + 1}. {service.serviceName}
              </p>
              <p className='flex items-center justify-between gap-2 text-sm italic text-secondary-light hover:text-white'>
                {selectedService?.serviceId === service.serviceId ||
                  'Xem biến thể >'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedServices;
