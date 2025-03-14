import { createSlice } from '@reduxjs/toolkit';
import { getUserById, getUsers } from '../thunks/userThunk';
import {
  createCombo,
  deleteCombo,
  getComboById,
  getCombos,
  updateCombo,
} from '../thunks/comboThunk';

const initialState = {
  combos: [],
  combo: {},
  selectedCombo: null,
  loading: false,
  error: null,
};

const comboSlice = createSlice({
  name: 'combos',
  initialState,
  reducers: {
    setSelectedCombo: (state, action) => {
      state.selectedCombo = state.combos.find(
        (s) => s.serviceComboId === action.payload
      );
    },

    resetSelectedCombo: (state) => {
      state.selectedCombo = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getCombos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCombos.fulfilled, (state, action) => {
        state.loading = false;
        state.combos = action.payload;
      })
      .addCase(getCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getComboById.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getComboById.fulfilled, (state, action) => {
        state.combo = action.payload;
        // state.loading = false;
      })
      .addCase(getComboById.rejected, (state, action) => {
        state.error = action.payload;
        // state.loading = false;
      });

    // Create
    builder
      .addCase(createCombo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCombo.fulfilled, (state, action) => {
        state.loading = false;
        state.combos = [...state.combos, action.payload];
      })
      .addCase(createCombo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPdate
    builder
      .addCase(updateCombo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCombo.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCombo = action.payload;
        state.combos = state.combos.map((combo) =>
          combo.serviceComboId === updatedCombo.serviceComboId
            ? updatedCombo
            : combo
        );
      })
      .addCase(updateCombo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteCombo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCombo.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCombo = action.payload;

        if (!updatedCombo.isVisible) {
          state.combos = state.combos.map((combo) =>
            combo.serviceComboId === updatedCombo.serviceComboId
              ? updatedCombo
              : combo
          );
        } else {
          state.combos = state.combos.filter(
            (combo) => combo.serviceComboId !== updatedCombo.serviceComboId
          );
        }
      })
      .addCase(deleteCombo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default comboSlice.reducer;

export const { setSelectedCombo, resetSelectedCombo } = comboSlice.actions;
