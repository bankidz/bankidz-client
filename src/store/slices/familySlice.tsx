import { IFamilyState } from '@lib/types/IFamilyState';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { TLevel } from '@lib/types/TLevel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IKid {
  username: string;
  isFemale: boolean;
  level: TLevel;
  kidId: number;
}

export type TFamilyState = {
  kids: IKid[] | null;
  parents: IFamilyState[] | null;
  family: IFamilyState[] | null; //진짜 맘에 안들지만....
  kidsStatus?: TFetchStatus;
  familyStatus?: TFetchStatus;
};

const initialState: TFamilyState = {
  kids: null,
  parents: null,
  family: null,
  kidsStatus: 'idle',
  familyStatus: 'idle',
};

// GET: 연결된 자녀 목록 조회 -> 자녀는 형제목록 가져오도록..!!
export const fetchKids = createAsyncThunk(
  'family/fetchKids',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/family/kid');
    return response.data;
  },
);

// GET: 연결된 부모 목록 fetch (마이페이지용 가족목록 상태도 같이 변경)
export const fetchFamily = createAsyncThunk(
  'family/fetchFamily',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/family');
    const familyUserList: IFamilyState[] = response.data.data.familyUserList;
    return familyUserList;
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
        console.error(action.error);
      })
      .addCase(fetchFamily.pending, (state) => {
        state.familyStatus = 'loading';
      })
      .addCase(fetchFamily.fulfilled, (state, action) => {
        state.familyStatus = 'succeeded';
        const familyUserList = action.payload;
        state.parents = familyUserList.filter((v) => v.isKid === false);
        state.family = familyUserList
          .filter((v) => v.isKid === false)
          .concat(familyUserList.filter((v) => v.isKid === true));
      })
      .addCase(fetchFamily.rejected, (state, action) => {
        state.familyStatus = 'failed';
        console.error(action.error);
      });
  },
});

// export const selectKidsStatus = (state: RootState) => state.family.kidsStatus;
// export const selectKids = (state: RootState) => state.family.kids;
export const selectFamilyStatus = (state: RootState) =>
  state.family.familyStatus;
export const selectParents = (state: RootState) => state.family.parents;
export const selectFamily = (state: RootState) => state.family.family;
export default familySlice.reducer;
