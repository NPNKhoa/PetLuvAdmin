import { createSlice } from '@reduxjs/toolkit';
import { getUserById, getUsers } from '../thunks/userThunk';

const initialState = {
  users: [],
  user: {},
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = state.users.find((s) => s.userId === action.payload);
    },

    resetSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

export const { setSelectedUser, resetSelectedUser } = userSlice.actions;
