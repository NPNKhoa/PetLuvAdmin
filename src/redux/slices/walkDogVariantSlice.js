import { createSlice } from '@reduxjs/toolkit';
import {
  createWalkDogVariant,
  getWalkDogVariantByServiceId,
  updateWalkDogVariant,
} from '../thunks/walkDogVariantThunk';

const initialState = {
  walkDogVariants: [],
  walkDogVariant: {},
  selectedwalkDogVariant: null,
  loading: false,
  error: null,
};

const walkDogVariantsSlice = createSlice({
  name: 'walkDogVariants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get By Service
    builder
      .addCase(getWalkDogVariantByServiceId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWalkDogVariantByServiceId.fulfilled, (state, action) => {
        state.loading = false;
        state.walkDogVariants = action.payload;
      })
      .addCase(getWalkDogVariantByServiceId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(createWalkDogVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWalkDogVariant.fulfilled, (state, action) => {
        state.loading = false;
        state.walkDogVariants = [...state.walkDogVariants, action.payload];
      })
      .addCase(createWalkDogVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPdate
    builder
      .addCase(updateWalkDogVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWalkDogVariant.fulfilled, (state, action) => {
        state.loading = false;
        const updatedwalkDogVariant = action.payload;

        state.walkDogVariants = state.walkDogVariants.map((walkDogVariant) =>
          walkDogVariant.walkDogVariantId ===
          updatedwalkDogVariant.walkDogVariantId
            ? updatedwalkDogVariant
            : walkDogVariant
        );
      })
      .addCase(updateWalkDogVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default walkDogVariantsSlice.reducer;
