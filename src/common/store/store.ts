import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './slice/authentication';
import { apiSlice } from './slice/api';
import folderReducer from './slice/folders/slice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    folders: folderReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;