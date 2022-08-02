import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TKidOverView = {
  achievedChallenge: number;
  totalChallenge: number;
  level: number;
};

export type TKidOverViewState = {
  kidOverView: TKidOverView;
  kidOverViewStatus?: TFetchStatus;
};

const initialState: TKidOverViewState = {
  kidOverView: { achievedChallenge: 0, totalChallenge: 0, level: 1 },
  kidOverViewStatus: 'idle',
};

// GET: 자녀 마이페이지 오버뷰 데이터
export const fetchKidOverView = createAsyncThunk(
  'kidOverView/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/user');
    return response.data;
  },
);

export const kidOverViewSlice = createSlice({
  name: 'kidOverView',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchKidOverView.pending, (state) => {
        state.kidOverViewStatus = 'loading';
      })
      .addCase(fetchKidOverView.fulfilled, (state, action) => {
        state.kidOverViewStatus = 'succeeded';
        state.kidOverView = action.payload.data.kid;
      })
      .addCase(fetchKidOverView.rejected, (state, action) => {
        state.kidOverViewStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectKidOverViewStatus = (state: RootState) =>
  state.kidOverView.kidOverViewStatus;
export const selectKidOverView = (state: RootState) =>
  state.kidOverView.kidOverView;
export default kidOverViewSlice.reducer;
