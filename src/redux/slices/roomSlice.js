import { createSlice } from '@reduxjs/toolkit';
import { createRoom, getAllRooms } from '../thunks/roomThunk';

const initialState = {
  rooms: [],
  room: {},
  loading: false,
  error: null,
};

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = [...state.rooms, action.payload];
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default RoomsSlice.reducer;
