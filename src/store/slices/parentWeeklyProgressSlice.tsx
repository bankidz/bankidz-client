import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TParentWeeklyProgressState = {
  parentWeeklyProgress: {
    currentSavings: number;
    totalPrice: number;
  } | null;
  parentWeeklyProgressStatus?: TFetchStatus;
};

const initialState: TParentWeeklyProgressState = {
  parentWeeklyProgress: null,
  parentWeeklyProgressStatus: 'idle',
};

// GET: 부모 홈 페이지 Summary 컴포넌트를 위한 주간 진행상황 fetch
export const fetchParentWeeklyProgress = createAsyncThunk(
  'parentWeeklyProgress/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; username: string }) => {
    const { axiosPrivate, username } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/progress/?kidName=${encodeURI(`${username}`)}`,
    );
    return response.data;
  },
);

export const parentWeeklyProgressSlice = createSlice({
  name: 'parentWeeklyProgress',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchParentWeeklyProgress.pending, (state) => {
        state.parentWeeklyProgressStatus = 'loading';
      })
      .addCase(fetchParentWeeklyProgress.fulfilled, (state, action) => {
        state.parentWeeklyProgressStatus = 'succeeded';
        state.parentWeeklyProgress = action.payload.data;
      })
      .addCase(fetchParentWeeklyProgress.rejected, (state, action) => {
        state.parentWeeklyProgressStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectParentWeeklyProgressStatus = (state: RootState) =>
  state.parentWeeklyProgress.parentWeeklyProgressStatus;
export const selectParentWeeklyProgress = (state: RootState) =>
  state.parentWeeklyProgress.parentWeeklyProgress;
export default parentWeeklyProgressSlice.reducer;
