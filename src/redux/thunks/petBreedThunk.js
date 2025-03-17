import { createAsyncThunk } from '@reduxjs/toolkit';
import petBreedService from '../../services/petBreed.service';

export const getPetBreeds = createAsyncThunk(
  'petBreeds/getPetBreeds',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await petBreedService.getAll(params);

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

export const getPetBreedById = createAsyncThunk(
  'petBreeds/getPetBreedById',
  async (params, { rejectWithValue }) => {
    try {
      const response = await petBreedService.getById(params);

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
