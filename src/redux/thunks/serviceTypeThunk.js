import { createAsyncThunk } from '@reduxjs/toolkit';
import serviceTypeService from '../../services/serviceType.service';

export const getServiceTypes = createAsyncThunk(
  'serviceTypes/getServiceTypes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await serviceTypeService.getAll(params);

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
