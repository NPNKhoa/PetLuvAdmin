import { createSlice } from '@reduxjs/toolkit';
import { createRoom, getAllRooms, updateRoom } from '../thunks/roomThunk';

const initialState = {
  rooms: [],
  room: {},
  selectedRoom: null,
  loading: false,
  error: null,
};

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setSelectedRoom: (state, action) => {
      state.selectedRoom = state.rooms.find((s) => s.roomId === action.payload);
    },

    resetSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
  },
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

    // Update
    builder
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRoom = action.payload;
        state.rooms = state.rooms.map((room) =>
          room.roomId === updatedRoom.roomId ? updatedRoom : room
        );
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default RoomsSlice.reducer;

export const { setSelectedRoom, resetSelectedRoom } = RoomsSlice.actions;
