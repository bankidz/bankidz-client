import { IDongil } from '@lib/types/IDongil';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IInterest {
  kidId: number;
  achievedChallengeListDTO: {
    challengeDTOList: {
      challenge: IDongil;
      interestPrice: number;
    }[];
    totalInterestPrice: number;
  };
}

interface INotPayedInterestState {
  notPayedInterests: IInterest[];
  notPayedInterestsStatus: TFetchStatus;
}

const initialState: INotPayedInterestState = {
  notPayedInterests: [],
  notPayedInterestsStatus: 'idle',
};

interface IFetchNotPayedInterestThunkPayload extends Pick<IInterest, 'kidId'> {
  axiosPrivate: AxiosInstance;
}

// GET: 지급이 필요한 이자 조회
export const fetchNotPayedInterest = createAsyncThunk(
  'notPayedInterests/fetch',
  async (thunkPayload: IFetchNotPayedInterestThunkPayload) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/achieved/${kidId}?interestPayment=notPayed`,
    );
    console.log(response.data);
    return response.data;
  },
);

export const notPayedInterestsSlice = createSlice({
  name: 'notPayedInterests',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotPayedInterest.pending, (state) => {
        state.notPayedInterestsStatus = 'loading';
      })
      .addCase(fetchNotPayedInterest.fulfilled, (state, action) => {
        state.notPayedInterestsStatus = 'succeeded';
        state.notPayedInterests = state.notPayedInterests.concat(
          action.payload.data,
        );
      })
      .addCase(fetchNotPayedInterest.rejected, (state) => {
        state.notPayedInterestsStatus = 'failed';
      });
  },
});

export const selectNotPayedInterestsStatus = (state: RootState) =>
  state.notPayedInterests.notPayedInterestsStatus;
export const selectNotPayedInterests = (state: RootState) =>
  state.notPayedInterests.notPayedInterests;

export default notPayedInterestsSlice.reducer;
