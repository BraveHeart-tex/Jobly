import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search';
import jobsReducer from './features/jobs';

export const store = configureStore({
  reducer: {
    searchReducer,
    jobsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
