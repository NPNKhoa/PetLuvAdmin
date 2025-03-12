import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingStatusService from '../../services/bookingStatus.service';

export const getBookingStatuses = createAsyncThunk(
  'bookingStatuses/getBookingStatuses',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await bookingStatusService.getAll(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
