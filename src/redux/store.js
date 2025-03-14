import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import serviceReducer from './slices/serviceSlice.js';
import serviceTypeReducer from './slices/serviceTypeSlice.js';
import roomReducer from './slices/roomSlice.js';
import roomTypeReducer from './slices/roomTypeSlice.js';
import bookingReducer from './slices/bookingSlice.js';
import paymentStatusReducer from './slices/paymentStatusSlice.js';
import bookingStatusReducer from './slices/bookingStatusSlice.js';
import petReducer from './slices/petSlice.js';
import userReducer from './slices/userSlice.js';
import comboReducer from './slices/comboSlice.js';

// const authUserFilter = createFilter('auth', ['user']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['services', 'serviceTypes', 'paymentStatuses', 'bookingStatuses'],
  //   transforms: [authUserFilter],
};

const rootReducer = combineReducers({
  services: serviceReducer,
  serviceTypes: serviceTypeReducer,
  rooms: roomReducer,
  roomTypes: roomTypeReducer,
  bookings: bookingReducer,
  paymentStatuses: paymentStatusReducer,
  bookingStatuses: bookingStatusReducer,
  pets: petReducer,
  users: userReducer,
  combos: comboReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
export default store;
