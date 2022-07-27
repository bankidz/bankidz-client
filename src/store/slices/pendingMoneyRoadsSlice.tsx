import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IMoneyRoad } from './walkingMoneyRoadsSlice';

export type TPendingMoneyRoadsState = {
  pendingMoneyRoads: IMoneyRoad[] | null;
  pendingMoneyRoadsStatus?: TFetchStatus;
};

const initialState: TPendingMoneyRoadsState = {
  pendingMoneyRoads: null,
  pendingMoneyRoadsStatus: 'idle',
};

// GET: 대기중인 돈길 데이터 fetch
export const fetchPendingMoneyRoads = createAsyncThunk(
  'PendingMoneyRoads/fetchPendingMoneyRoads',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=pending');
    return response.data;
  },
);

export const PendingMoneyRoadsSlice = createSlice({
  name: 'PendingMoneyRoads',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPendingMoneyRoads.pending, (state) => {
        state.pendingMoneyRoadsStatus = 'loading';
      })
      .addCase(fetchPendingMoneyRoads.fulfilled, (state, action) => {
        state.pendingMoneyRoadsStatus = 'succeeded';
        state.pendingMoneyRoads = action.payload.data;
      })
      .addCase(fetchPendingMoneyRoads.rejected, (state, action) => {
        state.pendingMoneyRoadsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectPendingMoneyRoadsStatus = (state: RootState) =>
  state.pendingMoneyRoads.pendingMoneyRoadsStatus;
export const selectPendingMoneyRoads = (state: RootState) =>
  state.pendingMoneyRoads.pendingMoneyRoads;
export default PendingMoneyRoadsSlice.reducer;
