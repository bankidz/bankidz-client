import { TFetchStatus } from '@lib/types/api';
import { TLevel } from '@lib/types/common';
import { IFamilyState } from '@lib/types/kid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export interface IKid {
  username: string;
  isFemale: boolean;
  level: TLevel;
}

export type TFamilyState = {
  kids: IKid[] | null;
  parents: IFamilyState[] | null;
  kidsStatus?: TFetchStatus;
  parentsStatus?: TFetchStatus;
};

const initialState: TFamilyState = {
  kids: null,
  parents: null,
  kidsStatus: 'idle',
  parentsStatus: 'idle',
};

// GET: 연결된 자녀 목록 fetch
export const fetchKids = createAsyncThunk(
  'family/fetchKids',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/family/kid');
    console.log('response.data: ', response.data);
    return response.data;
  },
);

// GET: 연결된 부모 목록 fetch
export const fetchParents = createAsyncThunk(
  'family/fetchParents',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/family');
    const familyUserList: IFamilyState[] = response.data.data.familyUserList;
    const parents = familyUserList.filter((v) => v.isKid === false);
    return parents;
  },
);

export const familySlice = createSlice({
  name: 'family',
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
      })
      .addCase(fetchParents.pending, (state) => {
        state.parentsStatus = 'loading';
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.parentsStatus = 'succeeded';
        state.parents = action.payload;
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.parentsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectKidsStatus = (state: RootState) => state.family.kidsStatus;
export const selectKids = (state: RootState) => state.family.kids;
export const selectParentsStatus = (state: RootState) =>
  state.family.parentsStatus;
export const selectParents = (state: RootState) => state.family.parents;
export default familySlice.reducer;
