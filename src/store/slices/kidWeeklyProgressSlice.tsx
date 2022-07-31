import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TKidWeeklyProgressState = {
  kidWeeklyProgress: {
    currentSavings: number;
    totalPrice: number;
  } | null;
  kidWeeklyProgressStatus?: TFetchStatus;
};

const initialState: TKidWeeklyProgressState = {
  kidWeeklyProgress: null,
  kidWeeklyProgressStatus: 'idle',
};

// GET: 자녀 홈 페이지 Summary 컴포넌트를 위한 주간 진행상황 fetch
export const fetchKidWeeklyProgress = createAsyncThunk(
  'kidWeeklyProgress/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/progress');
    return response.data;
  },
);

export const kidWeeklyProgressSlice = createSlice({
  name: 'kidWeeklyProgress',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchKidWeeklyProgress.pending, (state) => {
        state.kidWeeklyProgressStatus = 'loading';
      })
      .addCase(fetchKidWeeklyProgress.fulfilled, (state, action) => {
        state.kidWeeklyProgressStatus = 'succeeded';
        state.kidWeeklyProgress = action.payload.data;
      })
      .addCase(fetchKidWeeklyProgress.rejected, (state, action) => {
        state.kidWeeklyProgressStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectKidWeeklyProgressStatus = (state: RootState) =>
  state.kidWeeklyProgress.kidWeeklyProgressStatus;
export const selectKidWeeklyProgress = (state: RootState) =>
  state.kidWeeklyProgress.kidWeeklyProgress;
export default kidWeeklyProgressSlice.reducer;
