import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import logger from 'redux-logger';

// configureStore는 리덕스 코어 라이브러리의 표준 함수인 createStore를 추상화한 것이다.
export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
