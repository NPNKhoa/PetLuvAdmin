import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/user.service';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await userService.getAll(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (params, { rejectWithValue }) => {
    try {
      const response = await userService.getById(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
