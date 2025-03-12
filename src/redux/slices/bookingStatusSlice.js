import { createSlice } from '@reduxjs/toolkit';
import { getBookingStatuses } from '../thunks/bookingStatusThunk';

const initialState = {
  bookingStatuses: [],
  bookingStatus: {},
  loading: false,
  error: null,
};

const bookingStatusSlice = createSlice({
  name: 'bookingStatuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getBookingStatuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingStatuses = action.payload;
      })
      .addCase(getBookingStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingStatusSlice.reducer;
