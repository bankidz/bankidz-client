import { TFetchStatus } from '@lib/types/api';
import { TLevel } from '@lib/types/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export interface IKid {
  username: string;
  isFemale: boolean;
  level: TLevel;
}

export type TKidsState = {
  kids: IKid[] | null;
  kidsStatus?: TFetchStatus;
};

const initialState: TKidsState = {
  kids: null,
  kidsStatus: 'idle',
};

// GET: 연결된 자녀 목록 fetch
export const fetchKids = createAsyncThunk(
  'kids/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/family/kid');
    console.log('response.data: ', response.data);
    return response.data;
  },
);

export const kidsSlice = createSlice({
  name: 'kids',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchKids.pending, (state) => {
        state.kidsStatus = 'loading';
      })
      .addCase(fetchKids.fulfilled, (state, action) => {
        state.kidsStatus = 'succeeded';
        state.kids = action.payload.data;
      })
      .addCase(fetchKids.rejected, (state, action) => {
        state.kidsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectKidsStatus = (state: RootState) => state.kids.kidsStatus;
export const selectKids = (state: RootState) => state.kids.kids;
export default kidsSlice.reducer;
