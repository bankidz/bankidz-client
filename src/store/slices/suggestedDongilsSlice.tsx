import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IDongil } from './walkingDongilSlice';

export type TSuggestedDongilsState = {
  suggestedDongils: IDongil[] | null;
  suggestedDongilsStatus?: TFetchStatus;
};

const initialState: TSuggestedDongilsState = {
  suggestedDongils: null,
  suggestedDongilsStatus: 'idle',
};

// GET: 제안받은 돈길
export const fetchSuggestedDongils = createAsyncThunk(
  'suggestedDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/?status=pending/${kidId}`,
    );
    return response.data;
  },
);

export const suggestedDongilsSlice = createSlice({
  name: 'suggestedDongils',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSuggestedDongils.pending, (state) => {
        state.suggestedDongilsStatus = 'loading';
      })
      .addCase(fetchSuggestedDongils.fulfilled, (state, action) => {
        state.suggestedDongilsStatus = 'succeeded';
        state.suggestedDongils = action.payload.data;
      })
      .addCase(fetchSuggestedDongils.rejected, (state, action) => {
        state.suggestedDongilsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectSuggestedDongilsStatus = (state: RootState) =>
  state.suggestedDongils.suggestedDongilsStatus;
export const selectSuggestedDongils = (state: RootState) =>
  state.suggestedDongils.suggestedDongils;
export default suggestedDongilsSlice.reducer;
