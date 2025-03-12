import { createSlice } from '@reduxjs/toolkit';
import { getPaymentStatuses } from '../thunks/paymentStatusThunk';

const initialState = {
  paymentStatuses: [],
  paymentStatus: {},
  loading: false,
  error: null,
};

const paymentStatusSlice = createSlice({
  name: 'paymentStatuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getPaymentStatuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatuses = action.payload;
      })
      .addCase(getPaymentStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentStatusSlice.reducer;
