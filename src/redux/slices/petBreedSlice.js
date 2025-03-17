import { createSlice } from '@reduxjs/toolkit';
import { getPetBreedById, getPetBreeds } from '../thunks/petBreedThunk';

const initialState = {
  petBreeds: [],
  petBreed: {},
  loading: false,
  error: null,
};

const petBreedSlice = createSlice({
  name: 'petBreeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getPetBreeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.petBreeds = action.payload;
      })
      .addCase(getPetBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getPetBreedById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetBreedById.fulfilled, (state, action) => {
        state.petBreed = action.payload;
        state.loading = false;
      })
      .addCase(getPetBreedById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default petBreedSlice.reducer;
