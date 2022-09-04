import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IKidSummary {
  currentSavings: number;
  totalPrice: number;
}

interface IKidSummaryState {
  kidSummary: IKidSummary | null;
  kidSummaryStatus?: TFetchStatus;
}

const initialState: IKidSummaryState = {
  kidSummary: null,
  kidSummaryStatus: 'idle',
};

// GET: 자녀 홈 페이지 Summary 데이터 조회
export const fetchKidSummary = createAsyncThunk(
  'kidSummary/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/progress');
    return response.data;
  },
);

export const kidSummarySlice = createSlice({
  name: 'kidSummary',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchKidSummary.pending, (state) => {
        state.kidSummaryStatus = 'loading';
      })
      .addCase(fetchKidSummary.fulfilled, (state, action) => {
        state.kidSummaryStatus = 'succeeded';
        state.kidSummary = action.payload.data;
      })
      .addCase(fetchKidSummary.rejected, (state) => {
        state.kidSummaryStatus = 'failed';
      });
  },
});

export const selectKidSummaryStatus = (state: RootState) =>
  state.kidSummary.kidSummaryStatus;
export const selectKidSummary = (state: RootState) =>
  state.kidSummary.kidSummary;

export default kidSummarySlice.reducer;
