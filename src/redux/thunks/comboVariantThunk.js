import { createAsyncThunk } from '@reduxjs/toolkit';
import comboService from '../../services/combo.service';
import comboVariantService from '../../services/comboVariant.service';

export const getComboVariants = createAsyncThunk(
  'serviceVariants/getComboVariants',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await comboService.getVariants(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || error);
    }
  }
);

export const createComboVariant = createAsyncThunk(
  'serviceVariants/createComboVariant',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await comboVariantService.createAsync(payload);

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

export const deleteComboVariant = createAsyncThunk(
  'serviceVariants/deleteComboVariant',
  async (params, { rejectWithValue }) => {
    try {
      const response = await comboVariantService.deleteAsync(params);

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

export const updateComboVariant = createAsyncThunk(
  'serviceVariants/updateComboVariant',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await comboVariantService.updateAsync(payload);

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
