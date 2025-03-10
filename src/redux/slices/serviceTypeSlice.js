import { createSlice } from '@reduxjs/toolkit';
import { getServiceTypes } from '../thunks/serviceTypeThunk';

const initialState = {
  serviceTypes: [],
  serviceType: {},
  loading: false,
  error: null,
};

const serviceTypesSlice = createSlice({
  name: 'serviceTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getServiceTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceTypes = action.payload;
      })
      .addCase(getServiceTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceTypesSlice.reducer;
