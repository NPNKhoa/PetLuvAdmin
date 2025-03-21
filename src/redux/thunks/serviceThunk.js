import { createAsyncThunk } from '@reduxjs/toolkit';
import servicesService from '../../services/service.service';

export const getServices = createAsyncThunk(
  'services/getServices',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await servicesService.getServices(params);

      console.log(response);

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

export const getServiceById = createAsyncThunk(
  'services/getById',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await servicesService.getServiceById(serviceId);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getVariants = createAsyncThunk(
  'services/getVariants',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await servicesService.getVariants(serviceId);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await servicesService.createService(payload);

      if (!response?.flag) {
        return rejectWithValue(response.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await servicesService.deleteService(serviceId);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    if (!payload?.serviceId) {
      return rejectWithValue('ServiceId không hợp lệ');
    }

    try {
      const response = await servicesService.updateService(
        payload?.serviceId,
        payload
      );

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const toggleServiceVisiblility = createAsyncThunk(
  'services/toggleServiceVisiblility',
  async (payload, { rejectWithValue }) => {
    if (!payload?.serviceId) {
      return rejectWithValue('ServiceId không hợp lệ');
    }

    try {
      const body = { ...payload, isVisible: !payload.isVisible };

      const response = await servicesService.updateService(
        payload.serviceId,
        body
      );

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
