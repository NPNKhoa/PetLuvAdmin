import { createAsyncThunk } from '@reduxjs/toolkit';
import statisticService from '../../services/statistic.service';

export const getServicesBookedRatio = createAsyncThunk(
  'statistics/getServicesBookedRatio',
  async (params, { rejectWithValue }) => {
    try {
      const response = await statisticService.getServicesBookedRatio(params);

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

export const getBreedsBookedRatio = createAsyncThunk(
  'statistics/getBreedsBookedRatio',
  async (params, { rejectWithValue }) => {
    try {
      const response = await statisticService.getBreedsBookedRatio(params);

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

export const getRevenue = createAsyncThunk(
  'statistics/getRevenue',
  async (params, { rejectWithValue }) => {
    try {
      const response = await statisticService.getRevenue(params);

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

export const getBreedRatio = createAsyncThunk(
  'statistics/getBreedRatio',
  async (params, { rejectWithValue }) => {
    try {
      const response = await statisticService.getBreedRatio(params);

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
