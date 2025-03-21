import { createSlice } from '@reduxjs/toolkit';
import { getBookingTypes } from '../thunks/bookingTypeThunk';

const initialState = {
  bookingTypes: [],
  bookingType: {},
  selectedTypeId: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookingTypes',
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedTypeId = action.payload;
    },

    resetSelectedType: (state) => {
      state.selectedTypeId = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getBookingTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingTypes = action.payload;
      })
      .addCase(getBookingTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;

export const { setSelectedType, resetSelectedType } = bookingSlice.actions;
