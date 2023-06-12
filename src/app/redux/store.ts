import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search';
import jobsReducer from './features/jobs';
import sidebarReducer from './features/sidebar';

export const store = configureStore({
  reducer: {
    searchReducer,
    jobsReducer,
    sidebarReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
