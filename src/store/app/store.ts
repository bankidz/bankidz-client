import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../slices/authSlice';
import kidsReducer from '../slices/kidsSlice';
import familyReducer from '../slices/familySlice';
import createChallengeReducer from '../slices/createChallengeSlice';
import kidSummaryReducer from '../slices/kidSummarySlice';
import parentSummariesReducer from '../slices/parentSummariesSlice';
import walkingDongilsReducer from '../slices/walkingDongilsSlice';
import pendingDongilsReducer from '../slices/pendingDongilsSlice';
import proposedDongilsReducer from '../slices/proposedDongilsSlice';
import thisWeekSDongilsReducer from '../slices/thisWeekSDongilsSlice';
import overViewReducer from '@store/slices/overViewSlice';
import bottomSheetReducer from '@store/slices/bottomSheetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kids: kidsReducer,
    family: familyReducer,
    createChallenge: createChallengeReducer,
    kidSummary: kidSummaryReducer,
    parentSummaries: parentSummariesReducer,
    walkingDongils: walkingDongilsReducer,
    pendingDongils: pendingDongilsReducer,
    proposedDongils: proposedDongilsReducer,
    thisWeekSDongils: thisWeekSDongilsReducer,
    overView: overViewReducer,
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
