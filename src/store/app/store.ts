import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import createChallengeReducer from '../slices/createChallenge';
import kidWeeklyProgressReducer from '../slices/kidWeeklyProgressSlice';
import walkingDongilsReducer from '../slices/walkingDongilSlice';
import pendingDongilsReducer from '../slices/pendingDongilSlice';
import kidsReducer from '../slices/kidsSlice';
import parentWeeklyProgressReducer from '../slices/parentWeeklyProgressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createChallenge: createChallengeReducer,
    kidWeeklyProgress: kidWeeklyProgressReducer,
    walkingDongils: walkingDongilsReducer,
    pendingDongils: pendingDongilsReducer,
    kids: kidsReducer,
    parentWeeklyProgress: parentWeeklyProgressReducer,
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
