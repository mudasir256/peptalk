import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './slice/authentication';
import folderReducer from './slice/folders/slice';
import { apiSlice } from './slice/api/slice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    folders: folderReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

