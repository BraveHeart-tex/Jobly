import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search';

export const store = configureStore({
  reducer: {
    searchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
