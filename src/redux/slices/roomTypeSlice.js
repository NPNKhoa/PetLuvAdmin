import { createSlice } from '@reduxjs/toolkit';
import { getRoomTypes } from '../thunks/roomTypeThunk';

const initialState = {
  roomTypes: [],
  roomType: {},
  loading: false,
  error: null,
};

const roomTypeSlice = createSlice({
  name: 'roomTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getRoomTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.roomTypes = action.payload;
      })
      .addCase(getRoomTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomTypeSlice.reducer;
