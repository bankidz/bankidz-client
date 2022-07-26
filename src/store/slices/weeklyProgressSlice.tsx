import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TWeeklyProgressState = {
  weeklyProgress: {
    currentSavings: number;
    totalPrice: number;
  };
  weeklyProgressStatus?: TFetchStatus;
};

const initialState: TWeeklyProgressState = {
  weeklyProgress: {
    currentSavings: 55555,
    totalPrice: 55555,
  },
  weeklyProgressStatus: 'idle',
};

// GET: 주간 진행상황 fetch
export const fetchWeeklyProgress = createAsyncThunk(
  'weeklyProgress/fetchWeeklyProgress',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/progress');
    return response.data;
  },
);

export const weeklyProgressSlice = createSlice({
  name: 'weeklyProgress',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeeklyProgress.pending, (state) => {
        state.weeklyProgressStatus = 'loading';
      })
      .addCase(fetchWeeklyProgress.fulfilled, (state, action) => {
        state.weeklyProgressStatus = 'succeeded';
        console.log(
          'weeklyProgress action.payload.data: ',
          action.payload.data,
        );
        const { currentSavings, totalPrice } = action.payload.data;
        state.weeklyProgress.currentSavings = currentSavings;
        state.weeklyProgress.totalPrice = totalPrice;
      })
      .addCase(fetchWeeklyProgress.rejected, (state, action) => {
        state.weeklyProgressStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectWeeklyProgressStatus = (state: RootState) =>
  state.weeklyProgress.weeklyProgressStatus;
export const selectWeeklyProgress = (state: RootState) =>
  state.weeklyProgress.weeklyProgress;
export default weeklyProgressSlice.reducer;
