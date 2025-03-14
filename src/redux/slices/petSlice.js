import { createSlice } from '@reduxjs/toolkit';
import { getPetById, getPets } from '../thunks/petThunk';

const initialState = {
  pets: [],
  pet: {},
  selectedPet: null,
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setSelectedPet: (state, action) => {
      state.selectedPet = state.pets.find((s) => s.petId === action.payload);
    },

    resetSelectedPet: (state) => {
      state.selectedPet = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getPets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(getPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getPetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetById.fulfilled, (state, action) => {
        state.pet = action.payload;
        state.loading = false;
      })
      .addCase(getPetById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default petSlice.reducer;

export const { setSelectedPet, resetSelectedPet } = petSlice.actions;
