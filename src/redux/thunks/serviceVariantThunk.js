import { createAsyncThunk } from '@reduxjs/toolkit';
import serviceVariantService from '../../services/serviceVariant.service';

export const getServiceVariants = createAsyncThunk(
  'serviceVariants/getServiceVariants',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await serviceVariantService.getAll(params);

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

export const getServiceVairantByService = createAsyncThunk(
  'serviceVariants/getServiceVairantByService',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await serviceVariantService.getByService(serviceId);

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

export const createServiceVariant = createAsyncThunk(
  'serviceVariants/createServiceVariant',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await serviceVariantService.createAsync(payload);

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

export const deleteServiceVariant = createAsyncThunk(
  'serviceVariants/deleteServiceVariant',
  async (params, { rejectWithValue }) => {
    try {
      const response = await serviceVariantService.deleteAsync(params);

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

export const updateServiceVariant = createAsyncThunk(
  'serviceVariants/updateServiceVariant',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await serviceVariantService.updateAsync(payload);

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
