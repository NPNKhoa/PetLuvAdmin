import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';

const RoomCard = ({ item, onSelect, isSelected }) => {
  return (
    <Card
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? 'border-green-500 shadow-lg' : 'border-gray-200'
      }`}
      onClick={() => onSelect(item.id)}
    >
      <CardMedia
        component='img'
        height='140'
        image={item.image || 'https://via.placeholder.com/150'}
        alt={item.name}
      />
      <CardContent>
        <h3 className='text-lg font-semibold'>{item.name}</h3>
        <p className='text-sm text-gray-600'>{item.description}</p>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
