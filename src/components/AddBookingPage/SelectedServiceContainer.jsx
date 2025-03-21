import SelectedServices from './SelectedServices';
import SelectedServiceTable from './SelectedServiceTable';
import VariantSelection from './VariantSelection';

const SelectedServiceContainer = ({
  services,
  selectedService,
  onSelectService,
  variants,
  onSelectVariant,
  selectedItems,
  setFieldValue,
}) => {
  return (
    <>
      <h3 className='text-2xl text-secondary font-semibold'>Chọn biến thể</h3>
      <div className='grid grid-cols-2 gap-4 px-6 py-4 bg-white rounded-2xl shadow-md'>
        <SelectedServices
          services={services}
          selectedService={selectedService}
          onSelectService={onSelectService}
        />
        <VariantSelection
          variants={variants}
          onSelectVariant={onSelectVariant}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='col-span-2'>
        <SelectedServiceTable selectedItems={selectedItems} />
      </div>
    </>
  );
};

export default SelectedServiceContainer;
