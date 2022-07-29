import { TFetchStatus } from '@lib/types/api';
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

type TCreateChallengeState = {
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

const initialState: TCreateChallengeState = {
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
  'CreateChallenge/postChallenge',
  async (axiosPrivate: AxiosInstance, { getState, rejectWithValue }) => {
    try {
      const { CreateChallenge } = getState() as RootState;
      const response = await axiosPrivate.post(
        '/challenge',
        CreateChallenge.challenge,
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err);
      }
    }
  },
);

export const CreateChallengeSlice = createSlice({
  name: 'CreateChallenge',
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
      state = initialState;
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
        console.log(action.payload);
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
} = CreateChallengeSlice.actions;

export const selectChallengePayload = (state: RootState) =>
  state.CreateChallenge;
export const selectStep3InitData = (state: RootState) => {
  return {
    contractName: state.CreateChallenge.challenge.title,
    contractAmount: state.CreateChallenge.challenge.totalPrice,
  };
};
export const selectStep4InitData = (state: RootState) => {
  return {
    weekPrice: state.CreateChallenge.challenge.weekPrice,
    interestRate: state.CreateChallenge.challenge.interestRate,
    weeks: state.CreateChallenge.challenge.weeks,
  };
};
export const selectTotalPrice = (state: RootState) =>
  state.CreateChallenge.challenge.totalPrice;

export const selectPostChallengeResponse = (state: RootState) => {
  return {
    responseData: state.CreateChallenge.response,
    status: state.CreateChallenge.status,
  };
};

export default CreateChallengeSlice.reducer;
