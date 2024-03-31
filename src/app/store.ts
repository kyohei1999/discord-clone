import { configureStore } from '@reduxjs/toolkit';

import userReucer from '../features/userSlice';
import channelReducer from '../features/channelSlice';

export const store = configureStore({
  reducer: { user: userReucer, channel: channelReducer },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
