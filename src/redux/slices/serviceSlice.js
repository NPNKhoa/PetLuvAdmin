import { createSlice } from '@reduxjs/toolkit';
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  getVariants,
  updateService,
} from '../thunks/serviceThunk';

const initialState = {
  services: [],
  service: {},
  selectedService: null,
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = state.services.find(
        (s) => s.serviceId === action.payload
      );
    },

    resetSelectedService: (state) => {
      state.selectedService = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getServiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Variants
    builder
      .addCase(getVariants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.variants = action.payload;
      })
      .addCase(getVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = [...state.services, action.payload];
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPdate
    builder
      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const updatedService = action.payload;
        state.services = state.services.map((service) =>
          service.serviceId === updatedService.serviceId
            ? updatedService
            : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        const updatedService = action.payload;

        if (!updatedService.isVisible) {
          state.services = state.services.map((service) =>
            service.serviceId === updatedService.serviceId
              ? updatedService
              : service
          );
        } else {
          console.log(updatedService);
          state.services = state.services.filter(
            (service) => service.serviceId !== updatedService.serviceId
          );
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;

export const { setSelectedService, resetSelectedService } =
  servicesSlice.actions;
