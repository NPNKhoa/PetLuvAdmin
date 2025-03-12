import { createAsyncThunk } from '@reduxjs/toolkit';
import roomTypeService from '../../services/roomType.service';

export const getRoomTypes = createAsyncThunk(
  'roomTypes/getRoomTypes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await roomTypeService.getAll(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
