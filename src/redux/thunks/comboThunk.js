import { createAsyncThunk } from '@reduxjs/toolkit';
import comboService from '../../services/combo.service';

export const getCombos = createAsyncThunk(
  'combos/getCombos',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await comboService.getAll(params);

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

export const getComboById = createAsyncThunk(
  'combos/getComboById',
  async (params, { rejectWithValue }) => {
    try {
      const response = await comboService.getById(params);

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

export const createCombo = createAsyncThunk(
  'services/createCombo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await comboService.createAsync(payload);

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

export const updateCombo = createAsyncThunk(
  'combos/updateCombo',
  async (payload, { rejectWithValue }) => {
    const { comboId, body } = payload;

    try {
      const response = await comboService.updateAsync({ comboId, body });

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

export const deleteCombo = createAsyncThunk(
  'combos/deleteCombo',
  async (comboId, { rejectWithValue }) => {
    try {
      const response = await comboService.deleteAsync(comboId);

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
