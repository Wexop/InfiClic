import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slice';

export const store = configureStore({
  reducer: {
    auth: counterReducer,
  },
});

// Définitions des types du store et des dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
