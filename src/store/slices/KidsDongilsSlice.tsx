import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IDongil } from './walkingDongilSlice';

interface IKidsDongil {
  username: string;
  isFemale: boolean;
  challengeList: IDongil[];
}

export type TKidsDongilsState = {
  kidsDongils: IKidsDongil[] | null;
  kidsDongilsStatus?: TFetchStatus;
};

const initialState: TKidsDongilsState = {
  kidsDongils: null,
  kidsDongilsStatus: 'idle',
};

// GET: 모든 자녀의 돈길 데이터 fetch
export const fetchKidsDongils = createAsyncThunk(
  'kidsDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/kid');
    console.log(response.data);
    return response.data;
  },
);

export const kidsDongilsSlice = createSlice({
  name: 'kidsDongils',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchKidsDongils.pending, (state) => {
        state.kidsDongilsStatus = 'loading';
      })
      .addCase(fetchKidsDongils.fulfilled, (state, action) => {
        state.kidsDongilsStatus = 'succeeded';
        state.kidsDongils = action.payload.data;
      })
      .addCase(fetchKidsDongils.rejected, (state, action) => {
        state.kidsDongilsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectKidsDongilsStatus = (state: RootState) =>
  state.kidsDongils.kidsDongilsStatus;
export const selectKidsDongils = (state: RootState) =>
  state.kidsDongils.kidsDongils;
export default kidsDongilsSlice.reducer;
