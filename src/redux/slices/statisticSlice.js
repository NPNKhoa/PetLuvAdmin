import { createSlice } from '@reduxjs/toolkit';
import {
  getBreedRatio,
  getBreedsBookedRatio,
  getRevenue,
  getServicesBookedRatio,
} from '../thunks/statisticThunk';

const initialState = {
  bookedServices: [],
  bookedRooms: [],
  bookedCombos: [],
  bookedBreeds: [],
  revenue: [],
  breedRatio: [],
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Booked Services
    builder
      .addCase(getServicesBookedRatio.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServicesBookedRatio.fulfilled, (state, action) => {
        state.loading = false;
        state.bookedServices = action.payload;
      })
      .addCase(getServicesBookedRatio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.bookedServices = [];
      });

    // Get All Booked Breeds
    builder
      .addCase(getBreedsBookedRatio.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBreedsBookedRatio.fulfilled, (state, action) => {
        state.loading = false;
        state.bookedBreeds = action.payload;
      })
      .addCase(getBreedsBookedRatio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.bookedBreeds = [];
      });

    // Get Revenue
    builder
      .addCase(getRevenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.revenue = action.payload;
      })
      .addCase(getRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.revenue = [];
      });

    // Get Breed Ratio
    builder
      .addCase(getBreedRatio.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBreedRatio.fulfilled, (state, action) => {
        state.loading = false;
        state.breedRatio = action.payload;
      })
      .addCase(getBreedRatio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.breedRatio = [];
      });
  },
});

export default servicesSlice.reducer;
