import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import kidsReducer from '../slices/kidsSlice';
import createChallengeReducer from '../slices/createChallengeSlice';
import walkingDongilsReducer from '../slices/walkingDongilsSlice';
import bottomSheetReducer from '@store/slices/bottomSheetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kids: kidsReducer,
    createChallenge: createChallengeReducer,
    walkingDongils: walkingDongilsReducer,
    bottomSheet: bottomSheetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
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
