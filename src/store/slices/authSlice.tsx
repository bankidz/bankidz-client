import { axiosPublic } from '@apis/axios';
import { TLevel } from '@lib/types/TLevel';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IAuth {
  accessToken: string;
  isKid: boolean | null;
  level: TLevel | null;
  provider: string;
  birthday: string;
  username: string;
  isFemale: boolean | null;
  phone: string | null;
}

interface IAuthState {
  auth: IAuth;
}

// https://api.bankidz.com, https://bankids.click Role 통일
// 아빠(신성우): eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0ODQyMTQsInN1YiI6IjUiLCJleHAiOjE2NjI2OTM4MTQsImlkIjo1LCJyb2xlcyI6IlVTRVIifQ.5fKVlH-BGRRXiSP2WFtiLGheiNThQAC8wc7yj38MAG8
// 엄마(김민준): eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0MTMxNTcsInN1YiI6IjIiLCJleHAiOjE2NjI2MjI3NTcsImlkIjoyLCJyb2xlcyI6IlVTRVIifQ.ev6Jy4r-sgdOmASOLQ2aioMVhkYhXFZz3HXeyBzvYwU
// 아들(한규진): eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxOTg5NTQsInN1YiI6IjQiLCJleHAiOjE2NjM0MDg1NTQsImlkIjo0LCJyb2xlcyI6IlVTRVIifQ.F3tKrx-cVOHqPeU-a8opyLVK6oHbm83eAmh12HDNji0
// 딸(주어진): eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjI0Nzk4MzksInN1YiI6IjMiLCJleHAiOjE2NjI0Nzk4OTksImlkIjozLCJyb2xlcyI6IlVTRVIifQ.KmzWCJfLq_b2pJ_O1NaahjDStoYWa1PB7cG4PAUZnX0

const initialState: IAuthState = {
  auth: {
    accessToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0ODQyMTQsInN1YiI6IjUiLCJleHAiOjE2NjI2OTM4MTQsImlkIjo1LCJyb2xlcyI6IlVTRVIifQ.5fKVlH-BGRRXiSP2WFtiLGheiNThQAC8wc7yj38MAG8',
    isKid: false,
    level: null,
    provider: '',
    birthday: '',
    username: '',
    isFemale: null,
    phone: null,
  },
};

// POST: 카카오 서버로부터 받은 인증코드를 뱅키즈 서버로 전송
export const login = createAsyncThunk(
  'auth/login',
  async (thunkPayload: { code: string }) => {
    const { code } = thunkPayload;
    const response = await axiosPublic.post('/kakao/login', {
      code,
    });
    return response.data;
  },
);

interface IRegisterThunkPayload
  extends Pick<IAuth, 'birthday' | 'isFemale' | 'isKid'> {
  axiosPrivate: AxiosInstance;
}

// PATCH: 생년월일과 역할 정보가 없는 회원에 대해 입력받은 정보를 서버로 전송
export const register = createAsyncThunk(
  'auth/register',
  async (thunkPayload: IRegisterThunkPayload) => {
    const { axiosPrivate, birthday, isFemale, isKid } = thunkPayload;
    const response = await axiosPrivate.patch('/user', {
      birthday,
      isFemale,
      isKid,
    });
    return response.data;
  },
);

interface ICredentials
  extends Pick<IAuth, 'accessToken' | 'isKid' | 'level' | 'provider'> {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ICredentials>) => {
      const { accessToken, isKid, level, provider } = action.payload;
      state.auth.accessToken = accessToken;
      state.auth.isKid = isKid;
      state.auth.level = level;
      state.auth.provider = provider;
    },
    resetCredentials: (state) => {
      state.auth.accessToken = '';
      state.auth.isKid = null;
      state.auth.level = null;
      state.auth.provider = '';
    },
    setBirthday: (state, action: PayloadAction<string>) => {
      state.auth.birthday = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, isKid, level, provider } = action.payload.data;
        state.auth.accessToken = accessToken;
        state.auth.isKid = isKid;
        state.auth.level = level;
        state.auth.provider = provider;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { birthday, isFemale, isKid, phone, username } =
          action.payload.data;
        state.auth.birthday = birthday;
        state.auth.isFemale = isFemale;
        state.auth.isKid = isKid;
        state.auth.phone = phone;
        state.auth.username = username;
      });
  },
});

export const { setCredentials, resetCredentials, setBirthday } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectLevel = (state: RootState) => state.auth.auth.level;
export const selectBirthday = (state: RootState) => state.auth.auth.birthday;
export const selectProvider = (state: RootState) => state.auth.auth.provider;

export default authSlice.reducer;

// https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit
// https://redux-toolkit.js.org/api/createAsyncThunk
