import { IDongil } from '@lib/types/IDongil';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { RootState, store } from '../app/store';

interface IProposedDongil {
  userName: string;
  isFemale: boolean;
  challengeList: IDongil[];
}

interface IProposedDongilsState {
  proposedDongils: IProposedDongil[];
  proposedDongilsStatus?: TFetchStatus;
}

const initialState: IProposedDongilsState = {
  proposedDongils: [],
  proposedDongilsStatus: 'idle',
};

// GET: 제안받은 돈길 조회
export const fetchProposedDongils = createAsyncThunk(
  'proposedDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/${kidId}?status=pending`,
    );
    return response.data;
  },
);

// PATCH: 제안받은 돈길 수락
export const approveProposedDongil = createAsyncThunk(
  'proposedDongils/approve',
  async (thunkPayload: {
    axiosPrivate: AxiosInstance;
    idToApprove: number;
    isApprove: boolean;
  }) => {
    const { axiosPrivate, idToApprove, isApprove } = thunkPayload;
    const response = await axiosPrivate.patch(`/challenge/${idToApprove}`, {
      accept: isApprove,
    });
    return response.data;
  },
);

// PATCH: 제안받은 돈길 거절
export const rejectProposedDongil = createAsyncThunk(
  'proposedDongils/reject',
  async (thunkPayload: {
    axiosPrivate: AxiosInstance;
    idToApprove: number;
    comment: string;
  }) => {
    const { axiosPrivate, idToApprove, comment } = thunkPayload;
    const response = await axiosPrivate.patch(`/challenge/${idToApprove}`, {
      accept: false,
      comment,
    });
    console.log(response);
    return response.data;
  },
);

export const proposedDongilsSlice = createSlice({
  name: 'proposedDongils',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProposedDongils.pending, (state) => {
        state.proposedDongilsStatus = 'loading';
      })
      .addCase(fetchProposedDongils.fulfilled, (state, action) => {
        state.proposedDongilsStatus = 'succeeded';
        state.proposedDongils = state.proposedDongils.concat(
          action.payload.data,
        );
      })
      .addCase(fetchProposedDongils.rejected, (state, action) => {
        state.proposedDongilsStatus = 'failed';
        console.error(action.error);
      })
      .addCase(approveProposedDongil.fulfilled, (state, action: any) => {
        const approvedId = action.payload.data.id;
        state.proposedDongils = state.proposedDongils.map((proposedDongil) => {
          proposedDongil.challengeList = proposedDongil.challengeList.filter(
            (challenge) => challenge.id !== approvedId,
          );
          return proposedDongil;
        });
      })
      .addCase(rejectProposedDongil.fulfilled, (state, action: any) => {
        const approvedId = action.payload.data.id;
        state.proposedDongils = state.proposedDongils.map((proposedDongil) => {
          proposedDongil.challengeList = proposedDongil.challengeList.filter(
            (challenge) => challenge.id !== approvedId,
          );
          return proposedDongil;
        });
      })
      .addCase(rejectProposedDongil.rejected, (state, action: any) => {
        console.log(action);
      });
  },
});

export const selectProposedDongilsStatus = (state: RootState) =>
  state.proposedDongils.proposedDongilsStatus;
export const selectProposedDongils = (state: RootState) =>
  state.proposedDongils.proposedDongils;

export default proposedDongilsSlice.reducer;

// https://github.com/reduxjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument
// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#createslice
// https://velog.io/@vvvvwvvvv/React-21.-Redux-Saga-createSlicecreateSelector-%EC%A0%81%EC%9A%A9
// https://stackoverflow.com/questions/62451320/how-can-i-access-state-of-another-slice-in-redux-with-redux-toolkit
