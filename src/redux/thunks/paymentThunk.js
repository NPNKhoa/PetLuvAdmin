import { createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../services/payment.service';

export const getPayments = createAsyncThunk(
  'payments/getPayments',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await paymentService.getAll(params);

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

export const getPaymentById = createAsyncThunk(
  'payments/getPaymentById',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await paymentService.getById(params);

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

export const updateStatus = createAsyncThunk(
  'payments/updateStatus',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await paymentService.updateStatus(params);

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
