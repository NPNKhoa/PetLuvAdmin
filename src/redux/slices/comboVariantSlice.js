import { createSlice } from '@reduxjs/toolkit';
import {
  createComboVariant,
  deleteComboVariant,
  getComboVariants,
  updateComboVariant,
} from '../thunks/comboVariantThunk';

const initialState = {
  comboVariants: [],
  comboVariant: {},
  selectedVariant: null,
  loading: false,
  error: null,
};

const comboVariantsSlice = createSlice({
  name: 'comboVariants',
  initialState,
  reducers: {
    resetVariants: (state) => {
      state.comboVariants = [];
    },
  },
  extraReducers: (builder) => {
    // Get By Service
    builder
      .addCase(getComboVariants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComboVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.comboVariants = action.payload;
      })
      .addCase(getComboVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(createComboVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComboVariant.fulfilled, (state, action) => {
        state.loading = false;
        state.comboVariants = [...state.comboVariants, action.payload];
      })
      .addCase(createComboVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPdate
    builder
      .addCase(updateComboVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComboVariant.fulfilled, (state, action) => {
        state.loading = false;
        const updatedServiceVariant = action.payload;

        state.comboVariants = state.comboVariants.map((serviceVariant) =>
          serviceVariant.breedId === updatedServiceVariant.breedId &&
          serviceVariant.weightRange === updatedServiceVariant.weightRange
            ? updatedServiceVariant
            : serviceVariant
        );
      })
      .addCase(updateComboVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteComboVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComboVariant.fulfilled, (state, action) => {
        state.loading = false;
        const deletedServiceVariant = action.payload;

        const deletingVariant = state.comboVariants.find(
          (serviceVariant) =>
            serviceVariant.serviceComboId ===
              deletedServiceVariant.serviceComboId &&
            serviceVariant.breedId === deletedServiceVariant.breedId &&
            serviceVariant.weightRange === deletedServiceVariant.weightRange
        );

        if (deletingVariant.isVisible) {
          state.comboVariants = state.comboVariants.map((serviceVariant) =>
            serviceVariant.serviceComboId ===
              deletedServiceVariant.serviceComboId &&
            serviceVariant.breedId === deletedServiceVariant.breedId &&
            serviceVariant.weightRange === deletedServiceVariant.weightRange
              ? deletedServiceVariant
              : serviceVariant
          );
        } else {
          const index = state.comboVariants.findIndex(
            (serviceVariant) =>
              serviceVariant.serviceComboId !==
                deletedServiceVariant.serviceComboId &&
              serviceVariant.breedId !== deletedServiceVariant.breedId &&
              serviceVariant.weightRange !== deletedServiceVariant.weightRange
          );

          state.comboVariants.splice(index, 1);
        }
      })
      .addCase(deleteComboVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default comboVariantsSlice.reducer;
