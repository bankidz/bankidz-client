import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import createChallengeReducer from '../slices/createChallenge';
import kidSummaryReducer from '../slices/kidSummarySlice';
import walkingDongilsReducer from '../slices/walkingDongilSlice';
import pendingDongilsReducer from '../slices/pendingDongilSlice';
import familyReducer from '../slices/familySlice';
import parentSummaryReducer from '../slices/parentSummarySlice';
import suggestedDongilsReducer from '../slices/suggestedDongilsSlice';
import thisWeekSDongilsReducer from '../slices/thisWeekSDongilsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createChallenge: createChallengeReducer,
    kidSummary: kidSummaryReducer,
    walkingDongils: walkingDongilsReducer,
    pendingDongils: pendingDongilsReducer,
    family: familyReducer,
    parentSummary: parentSummaryReducer,
    suggestedDongils: suggestedDongilsReducer,
    thisWeekSDongils: thisWeekSDongilsReducer,
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
