import { createAsyncThunk } from '@reduxjs/toolkit';
import petService from '../../services/pet.service';

export const getPets = createAsyncThunk(
  'pets/getPets',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await petService.getAll(params);

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

export const getPetById = createAsyncThunk(
  'pets/getPetById',
  async (params, { rejectWithValue }) => {
    try {
      const response = await petService.getById(params);

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

export const getPetByUser = createAsyncThunk(
  'pets/getPetByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await petService.getByUser(userId);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
