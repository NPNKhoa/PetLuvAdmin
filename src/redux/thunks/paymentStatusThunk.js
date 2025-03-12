import { createAsyncThunk } from '@reduxjs/toolkit';
import paymentStatusService from '../../services/paymentStatus.service';

export const getPaymentStatuses = createAsyncThunk(
  'paymentStatuses/getPaymentStatuses',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await paymentStatusService.getAll(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
