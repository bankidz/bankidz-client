import { IDongil } from '@lib/types/IDongil';
import { IKid } from '@lib/types/IKid';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IThisWeekSDongil {
  userName: string;
  isFemale: boolean;
  challengeList: IDongil[];
}

interface IThisWeekSDongilsState {
  thisWeekSDongils: IThisWeekSDongil[];
  thisWeekSDongilsStatus: TFetchStatus;
}

const initialState: IThisWeekSDongilsState = {
  thisWeekSDongils: [],
  thisWeekSDongilsStatus: 'idle',
};

// GET: 금주의 돈길 조회
export const fetchThisWeekSDongils = createAsyncThunk(
  'thisWeekSDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/${kidId}?status=walking`,
    );
    return response.data;
  },
);

export const thisWeekSDongilsSlice = createSlice({
  name: 'thisWeekSDongils',
  initialState,
  reducers: {
    appendThisWeekSDongil: (
      state,
      action: PayloadAction<{ selectedKid: IKid; approvedDongil: IDongil }>,
    ) => {
      const { selectedKid, approvedDongil } = action.payload;
      state.thisWeekSDongils = state.thisWeekSDongils.map((thisWeekSDongil) => {
        if (thisWeekSDongil.userName === selectedKid.username) {
          thisWeekSDongil.challengeList =
            thisWeekSDongil.challengeList.concat(approvedDongil);
        }
        return thisWeekSDongil;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchThisWeekSDongils.pending, (state) => {
        state.thisWeekSDongilsStatus = 'loading';
      })
      .addCase(fetchThisWeekSDongils.fulfilled, (state, action) => {
        state.thisWeekSDongilsStatus = 'succeeded';
        state.thisWeekSDongils = state.thisWeekSDongils.concat(
          action.payload.data,
        );
      })
      .addCase(fetchThisWeekSDongils.rejected, (state) => {
        state.thisWeekSDongilsStatus = 'failed';
      });
  },
});

export const { appendThisWeekSDongil } = thisWeekSDongilsSlice.actions;

export const selectThisWeekSDongilsStatus = (state: RootState) =>
  state.thisWeekSDongils.thisWeekSDongilsStatus;
export const selectThisWeekSDongils = (state: RootState) =>
  state.thisWeekSDongils.thisWeekSDongils;

export default thisWeekSDongilsSlice.reducer;
