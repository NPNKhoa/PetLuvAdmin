import { createSlice } from '@reduxjs/toolkit';
import { getBookings, updateBooking } from '../thunks/bookingThunk';

const initialState = {
  bookings: [],
  booking: {},
  selectedBooking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setSelectedBooking: (state, action) => {
      state.selectedBooking = state.bookings.find(
        (s) => s.bookingId === action.payload
      );
    },

    resetSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update
    builder
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBooking = action.payload;
        state.bookings = state.bookings.map((booking) =>
          booking.bookingId === updatedBooking.bookingId
            ? updatedBooking
            : booking
        );
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;

export const { setSelectedBooking, resetSelectedBooking } =
  bookingSlice.actions;
