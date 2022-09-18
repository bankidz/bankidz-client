import { IDongil } from '@lib/types/IDongil';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

interface IPendingDongilsState {
  pendingDongils: IDongil[];
}

const initialState: IPendingDongilsState = {
  pendingDongils: [],
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

export const pendingDongilsSlice = createSlice({
  name: 'pendingDongils',
  initialState,
  reducers: {},
});

export default pendingDongilsSlice.reducer;
