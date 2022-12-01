import { configureStore } from '@reduxjs/toolkit';
import fetchPostsSlice from './fetchPostsSlice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    fetchPostsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
