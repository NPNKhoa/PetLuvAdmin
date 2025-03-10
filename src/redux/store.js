import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import serviceReducer from './slices/serviceSlice.js';
import serviceTypeReducer from './slices/serviceTypeSlice.js';

// const authUserFilter = createFilter('auth', ['user']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['services', 'serviceTypes'],
  //   transforms: [authUserFilter],
};

const rootReducer = combineReducers({
  services: serviceReducer,
  serviceTypes: serviceTypeReducer,
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
