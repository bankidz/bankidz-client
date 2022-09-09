import { axiosPublic } from '@apis/axios';
import { TLevel } from '@lib/types/TLevel';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IAuth {
  accessToken: string | null;
  isKid: boolean | null;
  provider: string | null;
  level: TLevel | null;
  birthday: string;
  username: string;
  isFemale: boolean | null;
  phone: string | null;
}

interface IAuthState {
  auth: IAuth;
}

// const initialState: IAuthState = {
//   auth: {
//     accessToken: getLocalStorage('accessToken'),
//     isKid: getLocalStorage('isKid'),
//     provider: getLocalStorage('provider'),
//     level: null,
//     birthday: '',
//     username: '',
//     isFemale: null,
//     phone: null,
//   },
// };

// https://api.bankidz.com, https://bankids.click Role 통일
// 아빠(신성우): eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0ODQyMTQsInN1YiI6IjUiLCJleHAiOjE2NjI2OTM4MTQsImlkIjo1LCJyb2xlcyI6IlVTRVIifQ.5fKVlH-BGRRXiSP2WFtiLGheiNThQAC8wc7yj38MAG8
// 엄마(김민준): "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYyNzE2MjIwLCJzdWIiOiIyIiwiZXhwIjoxNjc4MjY4MjIwLCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.ESHvIwFq_D4Kh7IJGVb3FYZvlZtjSkG_RefmzZ1EhNs"
// 아들(한규진): eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxOTg5NTQsInN1YiI6IjQiLCJleHAiOjE2NjM0MDg1NTQsImlkIjo0LCJyb2xlcyI6IlVTRVIifQ.F3tKrx-cVOHqPeU-a8opyLVK6oHbm83eAmh12HDNji0
// 딸(주어진): eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjI0Nzk4MzksInN1YiI6IjMiLCJleHAiOjE2NjI0Nzk4OTksImlkIjozLCJyb2xlcyI6IlVTRVIifQ.KmzWCJfLq_b2pJ_O1NaahjDStoYWa1PB7cG4PAUZnX0

const initialState: IAuthState = {
  auth: {
    accessToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYyNzE2MjIwLCJzdWIiOiIyIiwiZXhwIjoxNjc4MjY4MjIwLCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.ESHvIwFq_D4Kh7IJGVb3FYZvlZtjSkG_RefmzZ1EhNs',
    isKid: false,
    provider: 'kakao',
    level: null,
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
      state.auth.accessToken = null;
      state.auth.isKid = null;
      state.auth.level = null;
      state.auth.provider = null;
    },
    setBirthday: (state, action: PayloadAction<string>) => {
      state.auth.birthday = action.payload;
    },
    setLevel: (state, action: PayloadAction<TLevel>) => {
      state.auth.level = action.payload;
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

export const { setCredentials, resetCredentials, setBirthday, setLevel } =
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
