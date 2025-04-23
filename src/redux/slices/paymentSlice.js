import { createSlice } from '@reduxjs/toolkit';
import {
  getPaymentById,
  getPayments,
  updateStatus,
} from '../thunks/paymentThunk';

const initialState = {
  payments: [],
  payment: {},
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update status
    builder
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.payments.findIndex(
          (payment) => payment.paymentId === action.payload.paymentId
        );
        state.payments[index] = action.payload;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
