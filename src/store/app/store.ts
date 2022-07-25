import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import challengePayloadReducer from '../slices/challengePayloadSlice';
import walkingMoneyRoadReducer from '../slices/walkingMoneyRoadSlice';
import pendingMoneyRoadReducer from '../slices/pendingMoneyRoadSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challengePayload: challengePayloadReducer,
    walkingMoneyRoad: walkingMoneyRoadReducer,
    pendingMoneyRoad: pendingMoneyRoadReducer,
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
