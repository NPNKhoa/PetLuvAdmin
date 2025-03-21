import { ErrorMessage } from 'formik';
import CustomerCard from '../common/CustomerCard';
import { TextField } from '@mui/material';

const CustomerSelection = ({
  search,
  customers,
  onSearch,
  onSelect,
  setFieldValue,
  selectedCustomer,
}) => {
  return (
    <>
      <h3 className='text-2xl text-secondary font-semibold'>Chọn khách hàng</h3>
      <TextField
        label='Nhập tên hoặc số điện thoại...'
        type='text'
        value={search}
        onChange={onSearch}
        className='w-1/2 mx-auto ms-auto'
      />
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {customers?.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onSelect={() => {
              onSelect(customer.userId, setFieldValue);
            }}
            isSelected={
              selectedCustomer
                ? selectedCustomer?.userId === customer?.userId
                : false
            }
          />
        ))}
      </div>
      <ErrorMessage name='customerId' component='p' className='text-red-500' />
    </>
  );
};

export default CustomerSelection;
