import { IDongil } from '@lib/types/IDongil';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

interface IProposedDongil {
  kidId: number;
  challengeList: IDongil[];
}

interface IProposedDongilsState {
  proposedDongils: IProposedDongil[];
}

const initialState: IProposedDongilsState = {
  proposedDongils: [],
};

// PATCH: 제안받은 돈길 거절
export const rejectProposedDongil = createAsyncThunk(
  'proposedDongils/reject',
  async (thunkPayload: {
    axiosPrivate: AxiosInstance;
    id: number;
    comment: string;
  }) => {
    const { axiosPrivate, id, comment } = thunkPayload;
    const response = await axiosPrivate.patch(`/challenge/${id}`, {
      accept: false,
      comment,
    });
    return response.data;
  },
);

export const proposedDongilsSlice = createSlice({
  name: 'proposedDongils',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(rejectProposedDongil.fulfilled, (state, action) => {
      const approvedId = action.payload.data.id;
      state.proposedDongils = state.proposedDongils.map((proposedDongil) => {
        proposedDongil.challengeList = proposedDongil.challengeList.filter(
          (challenge) => challenge.id !== approvedId,
        );
        return proposedDongil;
      });
    });
  },
});

export default proposedDongilsSlice.reducer;

// https://github.com/reduxjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument
// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#createslice
// https://velog.io/@vvvvwvvvv/React-21.-Redux-Saga-createSlicecreateSelector-%EC%A0%81%EC%9A%A9
// https://stackoverflow.com/questions/62451320/how-can-i-access-state-of-another-slice-in-redux-with-redux-toolkit
