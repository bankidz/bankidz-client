import { IKid } from '@lib/types/IKid';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

type TKidsState = {
  // kids: null - 연결된 자녀 없음
  kids: IKid[];
  // selectedKid - 부모 홈에서 다자녀중 선택한 자녀 한명
  selectedKid: IKid | null;
  // hasMultipleKids - 다자녀 유무
  hasMultipleKids: boolean;
  kidsStatus?: TFetchStatus;
};

const initialState: TKidsState = {
  kids: [],
  selectedKid: null,
  hasMultipleKids: false,
  kidsStatus: 'idle',
};

// GET: 연결된 자녀 목록 조회
export const fetchKids = createAsyncThunk(
  'kids/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/family/kid');
    return response.data;
  },
);

export const kidsSlice = createSlice({
  name: 'kids',
  initialState,
  reducers: {
    setSelectedKid: (state, action: PayloadAction<IKid>) => {
      state.selectedKid = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchKids.pending, (state) => {
        state.kidsStatus = 'loading';
      })
      .addCase(fetchKids.fulfilled, (state, action) => {
        state.kidsStatus = 'succeeded';
        state.kids = action.payload.data;
        if (state.kids) {
          state.selectedKid = state.kids[0];
          if (state.kids.length >= 2) {
            state.hasMultipleKids = true;
          }
        }
      })
      .addCase(fetchKids.rejected, (state, action) => {
        state.kidsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const { setSelectedKid } = kidsSlice.actions;

export const selectKidsStatus = (state: RootState) => state.kids.kidsStatus;
export const selectKids = (state: RootState) => state.kids.kids;
export const selectSelectedKid = (state: RootState) => state.kids.selectedKid;
export const selectHasMultipleKids = (state: RootState) =>
  state.kids.hasMultipleKids;

export default kidsSlice.reducer;
