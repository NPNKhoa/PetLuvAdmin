import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/booking.service';

export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await bookingService.getAll(params);

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

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await bookingService.createBooking(payload);

      if (!response?.flag) {
        return rejectWithValue(response.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async (params, { rejectWithValue }) => {
    try {
      const response = await bookingService.updateAsync(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
