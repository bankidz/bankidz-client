import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import createChallengeReducer from '../slices/createChallenge';
import walkingDongilsReducer from '../slices/walkingDongilSlice';
import pendingDongilsReducer from '../slices/pendingDongilSlice';
import kidWeeklyProgressReducer from '../slices/kidWeeklyProgressSlice';
import kidsReducer from '../slices/kidsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createChallenge: createChallengeReducer,
    walkingDongils: walkingDongilsReducer,
    pendingDongils: pendingDongilsReducer,
    kidWeeklyProgress: kidWeeklyProgressReducer,
    kids: kidsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
