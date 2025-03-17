import { createAsyncThunk } from '@reduxjs/toolkit';
import walkdogVariantService from '../../services/walkdogVariant.service';

export const getWalkDogVariantByServiceId = createAsyncThunk(
  'walkDogVariants/getWalkDogVariantByServiceId',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await walkdogVariantService.getByServiceId(serviceId);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }
      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const createWalkDogVariant = createAsyncThunk(
  'walkDogVariants/createWalkDogVariant',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await walkdogVariantService.createAsync(payload);

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

export const updateWalkDogVariant = createAsyncThunk(
  'walkDogVariants/updateWalkDogVariant',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await walkdogVariantService.updateAsync(payload);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
