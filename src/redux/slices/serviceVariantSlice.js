import { createSlice } from '@reduxjs/toolkit';
import {
  createServiceVariant,
  getServiceVairantById,
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
  reducers: {},
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

    // Get By Id
    builder
      .addCase(getServiceVairantById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceVairantById.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceVariant = action.payload;
      })
      .addCase(getServiceVairantById.rejected, (state, action) => {
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
          serviceVariant.serviceVariantId ===
          updatedServiceVariant.serviceVariantId
            ? updatedServiceVariant
            : serviceVariant
        );
      })
      .addCase(updateServiceVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // // Delete
    // builder
    //   .addCase(deleteServiceVariant.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteServiceVariant.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const updatedServiceVariant = action.payload;

    //     if (!updatedServiceVariant.isVisible) {
    //       state.serviceVariants = state.serviceVariants.map((serviceVariant) =>
    //         serviceVariant.serviceVariantId === updatedServiceVariant.serviceVariantId
    //           ? updatedServiceVariant
    //           : serviceVariant
    //       );
    //     } else {
    //       console.log(updatedServiceVariant);
    //       state.serviceVariants = state.serviceVariants.filter(
    //         (serviceVariant) => serviceVariant.serviceVariantId !== updatedServiceVariant.serviceVariantId
    //       );
    //     }
    //   })
    //   .addCase(deleteServiceVariant.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default serviceVariantsSlice.reducer;
