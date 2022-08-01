import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import createChallengeReducer from '../slices/createChallenge';
import walkingDongilsReducer from '../slices/walkingDongilSlice';
import pendingDongilsReducer from '../slices/pendingDongilSlice';
import weeklyProgressReducer from '../slices/weeklyDongilSlice';
import familyReducer from '../slices/familySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createChallenge: createChallengeReducer,
    walkingDongils: walkingDongilsReducer,
    pendingDongils: pendingDongilsReducer,
    weeklyProgress: weeklyProgressReducer,
    family: familyReducer,
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
