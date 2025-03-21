import React, { useState } from 'react';
import { FaRegCircleCheck, FaCircleCheck } from 'react-icons/fa6';

const CustomerCard = ({ customer, onSelect, isSelected }) => {
  return (
    <div
      className={`cursor-pointer transition-all border-2 p-4 flex items-center rounded-lg justify-start gap-4 relative bg-tertiary-light ${
        isSelected ? 'border-primary shadow-lg border-[3px]' : 'border-gray-200'
      } hover:scale-105`}
      onClick={() => {
        onSelect(customer.id);
      }}
    >
      <img
        src={customer?.avatar || '/logo.png'}
        alt={`${customer?.fullname} avatar`}
        className='w-16 h-16 object-cover rounded-full'
      />
      <div>
        <h3 className='text-lg font-semibold'>{customer?.fullName || 'N/A'}</h3>
        <p className='text-sm text-gray-600'>{customer?.email || 'N/A'}</p>
        <p className='text-sm text-gray-600'>
          {customer?.phoneNumber || 'N/A'}
        </p>
        {isSelected ? (
          <FaCircleCheck
            className='absolute top-2 right-2 text-primary'
            size={'1.5rem'}
          />
        ) : (
          <FaRegCircleCheck
            className='absolute top-2 right-2 text-primary'
            size={'1.5rem'}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
