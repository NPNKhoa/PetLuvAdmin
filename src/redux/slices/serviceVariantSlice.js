import { createSlice } from '@reduxjs/toolkit';
import {
  createServiceVariant,
  deleteServiceVariant,
  getServiceVairantByService,
  getServiceVariants,
  updateServiceVariant,
} from '../thunks/serviceVariantThunk';

const initialState = {
  serviceVariants: [],
  serviceVariant: {},
  selectedServiceVariant: null,
  loading: false,
  error: null,
};

const serviceVariantsSlice = createSlice({
  name: 'serviceVariants',
  initialState,
  reducers: {
    resetVariants: (state) => {
      state.serviceVariants = [];
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getServiceVariants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceVariants = action.payload;
      })
      .addCase(getServiceVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Service
    builder
      .addCase(getServiceVairantByService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceVairantByService.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceVariants = action.payload;
      })
      .addCase(getServiceVairantByService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(createServiceVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(createServiceVariant.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceVariants = [...state.serviceVariants, action.payload];
      })
      .addCase(createServiceVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPdate
    builder
      .addCase(updateServiceVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateServiceVariant.fulfilled, (state, action) => {
        state.loading = false;
        const updatedServiceVariant = action.payload;

        state.serviceVariants = state.serviceVariants.map((serviceVariant) =>
          serviceVariant.breedId === updatedServiceVariant.breedId &&
          serviceVariant.petWeightRange === updatedServiceVariant.petWeightRange
            ? updatedServiceVariant
            : serviceVariant
        );
      })
      .addCase(updateServiceVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteServiceVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteServiceVariant.fulfilled, (state, action) => {
        state.loading = false;
        const deletedServiceVariant = action.payload;

        const deletingVariant = state.serviceVariants.find(
          (serviceVariant) =>
            serviceVariant.serviceId === deletedServiceVariant.serviceId &&
            serviceVariant.breedId === deletedServiceVariant.breedId &&
            serviceVariant.petWeightRange ===
              deletedServiceVariant.petWeightRange
        );

        if (deletingVariant.isVisible) {
          state.serviceVariants = state.serviceVariants.map((serviceVariant) =>
            serviceVariant.serviceId === deletedServiceVariant.serviceId &&
            serviceVariant.breedId === deletedServiceVariant.breedId &&
            serviceVariant.petWeightRange ===
              deletedServiceVariant.petWeightRange
              ? deletedServiceVariant
              : serviceVariant
          );
        } else {
          const index = state.serviceVariants.findIndex(
            (serviceVariant) =>
              serviceVariant.serviceId !== deletedServiceVariant.serviceId &&
              serviceVariant.breedId !== deletedServiceVariant.breedId &&
              serviceVariant.petWeightRange !==
                deletedServiceVariant.petWeightRange
          );

          state.serviceVariants.splice(index, 1);
        }
      })
      .addCase(deleteServiceVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceVariantsSlice.reducer;

export const { resetVariants } = serviceVariantsSlice.actions;
