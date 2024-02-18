import { baseAPI } from '@/api/base.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import charactersSlice from './charactersSlice';

const rootReducer = combineReducers({
  characters: charactersSlice,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
