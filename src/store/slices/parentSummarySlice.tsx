import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TParentSummaryState = {
  parentSummary: {
    currentSavings: number;
    totalPrice: number;
  } | null;
  parentSummaryStatus?: TFetchStatus;
};

const initialState: TParentSummaryState = {
  parentSummary: null,
  parentSummaryStatus: 'idle',
};

// GET: 부모 홈 페이지 Summary 컴포넌트를 위한 주간 진행상황
export const fetchParentSummary = createAsyncThunk(
  'parentSummary/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    console.log('kidId: ', kidId);
    const response = await axiosPrivate.get(`/challenge/kid/progress/${kidId}`);
    return response.data;
  },
);

export const parentSummarySlice = createSlice({
  name: 'parentSummary',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchParentSummary.pending, (state) => {
        state.parentSummaryStatus = 'loading';
      })
      .addCase(fetchParentSummary.fulfilled, (state, action) => {
        state.parentSummaryStatus = 'succeeded';
        state.parentSummary = action.payload.data;
      })
      .addCase(fetchParentSummary.rejected, (state, action) => {
        state.parentSummaryStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectParentSummaryStatus = (state: RootState) =>
  state.parentSummary.parentSummaryStatus;
export const selectParentSummary = (state: RootState) =>
  state.parentSummary.parentSummary;
export default parentSummarySlice.reducer;
