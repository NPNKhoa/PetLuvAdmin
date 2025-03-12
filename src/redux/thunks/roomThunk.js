import { createAsyncThunk } from '@reduxjs/toolkit';
import roomService from '../../services/room.service';

export const getAllRooms = createAsyncThunk(
  'rooms/getAllRooms',
  async (params, { rejectWithValue }) => {
    try {
      const response = await roomService.getAll(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await roomService.createAsync(payload);

      if (!response?.flag) {
        return rejectWithValue(response.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
