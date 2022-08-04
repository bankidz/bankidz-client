import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import createChallengeReducer from '../slices/createChallengeSlice';
import kidSummaryReducer from '../slices/kidSummarySlice';
import walkingDongilsReducer from '../slices/walkingDongilsSlice';
import pendingDongilsReducer from '../slices/pendingDongilsSlice';
import familyReducer from '../slices/familySlice';
import parentSummaryReducer from '../slices/parentSummarySlice';
import proposedDongilsReducer from '../slices/proposedDongilsSlice';
import thisWeekSDongilsReducer from '../slices/thisWeekSDongilsSlice';
import overViewReducer from '@store/slices/overViewSlice';
import kidsReducer from '../slices/kidsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createChallenge: createChallengeReducer,
    kidSummary: kidSummaryReducer,
    walkingDongils: walkingDongilsReducer,
    pendingDongils: pendingDongilsReducer,
    family: familyReducer,
    parentSummary: parentSummaryReducer,
    proposedDongils: proposedDongilsReducer,
    thisWeekSDongils: thisWeekSDongilsReducer,
    overView: overViewReducer,
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
