import { IDongil } from '@lib/types/IDongil';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TPendingDongilsState = {
  pendingDongils: IDongil[];
  pendingDongilsStatus?: TFetchStatus;
};

const initialState: TPendingDongilsState = {
  pendingDongils: [],
  pendingDongilsStatus: 'idle',
};

// GET: 대기중인 돈길 조회
export const fetchPendingDongils = createAsyncThunk(
  'pendingDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=pending');
    return response.data;
  },
);

// DELETE: 대기중인 돈길 삭제
export const deletePendingDongil = createAsyncThunk(
  'pendingDongils/delete',
  async (thunkPayload: { axiosPrivate: AxiosInstance; id: number }) => {
    const { axiosPrivate, id } = thunkPayload;
    const response = await axiosPrivate.delete(`/challenge/${id}`);
    console.log('response.data', response.data);
    return response.data;
  },
);

export const pendingDongilsSlice = createSlice({
  name: 'pendingDongils',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPendingDongils.pending, (state) => {
        state.pendingDongilsStatus = 'loading';
      })
      .addCase(fetchPendingDongils.fulfilled, (state, action) => {
        state.pendingDongilsStatus = 'succeeded';
        state.pendingDongils = action.payload.data;
      })
      .addCase(fetchPendingDongils.rejected, (state, action) => {
        state.pendingDongilsStatus = 'failed';
        console.error(action.error.message);
      })
      .addCase(deletePendingDongil.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        state.pendingDongils = state.pendingDongils!.filter(
          (pendingDongil) => pendingDongil.id !== id,
        );
      });
  },
});

export const selectPendingDongilsStatus = (state: RootState) =>
  state.pendingDongils.pendingDongilsStatus;

export const selectPendingDongils = (state: RootState) =>
  state.pendingDongils.pendingDongils;

export default pendingDongilsSlice.reducer;
