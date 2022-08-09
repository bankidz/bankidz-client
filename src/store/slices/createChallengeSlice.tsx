import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

type TPostChallengeResponseState = {
  challengeCategory: string;
  comment: null;
  createdAt: string;
  id: number;
  interestRate: number;
  isAchieved: number;
  isMom: boolean;
  itemName: string;
  progressList: null;
  status: 0 | 1 | 2;
  title: string;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
};

type TcreateChallengeState = {
  status: TFetchStatus;
  error: string | undefined;
  challenge: {
    category: string;
    isMom: boolean | null;
    itemName: string | null;
    title: string;
    interestRate: 10 | 20 | 30 | null;
    totalPrice: number;
    weekPrice: number;
    weeks: number;
  };
  response: TPostChallengeResponseState | null;
};

const initialState: TcreateChallengeState = {
  status: 'idle',
  error: undefined,
  challenge: {
    category: '이자율 받기',
    isMom: null,
    itemName: null,
    title: '',
    interestRate: null,
    totalPrice: 0,
    weekPrice: 0,
    weeks: 0,
  },
  response: null,
};

// POST: 프로필 정보가 없는 회원에 대해 입력받은 프로필 정보 전송
export const postChallenge = createAsyncThunk(
  'createChallenge/postChallenge',
  async (axiosPrivate: AxiosInstance, { getState, rejectWithValue }) => {
    try {
      const { createChallenge } = getState() as RootState;
      const response = await axiosPrivate.post(
        '/challenge',
        createChallenge.challenge,
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err);
      }
    }
  },
);

export const createChallengeSlice = createSlice({
  name: 'createChallenge',
  initialState,
  reducers: {
    dispatchParent(state, action: PayloadAction<boolean>) {
      state.challenge.isMom = action.payload;
    },
    dispatchItemName(state, action: PayloadAction<string>) {
      state.challenge.itemName = action.payload;
    },
    dispatchTitle(state, action: PayloadAction<string>) {
      state.challenge.title = action.payload;
    },
    dispatchTotalPrice(state, action: PayloadAction<number>) {
      state.challenge.totalPrice = action.payload;
    },
    dispatchWeekPrice(state, action: PayloadAction<number>) {
      state.challenge.weekPrice = action.payload;
    },
    dispatchInterestRate(state, action: PayloadAction<10 | 20 | 30 | null>) {
      state.challenge.interestRate = action.payload;
    },
    dispatchWeeks(state, action: PayloadAction<number>) {
      state.challenge.weeks = action.payload;
    },
    dispatchResetChallengePayload(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postChallenge.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postChallenge.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(postChallenge.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const {
  dispatchParent,
  dispatchItemName,
  dispatchTitle,
  dispatchTotalPrice,
  dispatchWeekPrice,
  dispatchInterestRate,
  dispatchWeeks,
  dispatchResetChallengePayload,
} = createChallengeSlice.actions;

export const selectCreateChallenge = (state: RootState) =>
  state.createChallenge.challenge;
export const selectStep3InitData = (state: RootState) => {
  return {
    contractName: state.createChallenge.challenge.title,
    contractAmount: state.createChallenge.challenge.totalPrice,
  };
};
export const selectStep4InitData = (state: RootState) => {
  return {
    weekPrice: state.createChallenge.challenge.weekPrice,
    interestRate: state.createChallenge.challenge.interestRate,
    weeks: state.createChallenge.challenge.weeks,
  };
};
export const selectTotalPrice = (state: RootState) =>
  state.createChallenge.challenge.totalPrice;

export const selectPostChallengeResponse = (state: RootState) => {
  return {
    responseData: state.createChallenge.response,
    status: state.createChallenge.status,
  };
};

export default createChallengeSlice.reducer;
