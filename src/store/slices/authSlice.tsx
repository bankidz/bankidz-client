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
  withdrawReason: string;
}

interface IAuthState {
  auth: IAuth;
}

const initialState: IAuthState = {
  auth: {
    //accessToken: getLocalStorage('accessToken'),
    //isKid: getLocalStorage('isKid'),
    accessToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYyODg3MDc3LCJzdWIiOiI0IiwiZXhwIjoxNjc4NDM5MDc3LCJpZCI6NCwicm9sZXMiOiJVU0VSIn0.W-VmYQgmG_hW8YpNMoogJU3zmSz4CS-3YK9JV9OHNdw',
    isKid: true,
    provider: getLocalStorage('provider'),
    level: null,
    birthday: '',
    username: '',
    isFemale: null,
    phone: null,
    withdrawReason: '',
  },
};

// 한규진 카카오 (아들) : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYyNzMyMjM4LCJzdWIiOiI0IiwiZXhwIjoxNjc4Mjg0MjM4LCJpZCI6NCwicm9sZXMiOiJVU0VSIn0.EN5n-n8RQv825ummHGIVyoZEnjfyd9N4BA5W8tekuVc"
// 한규진 애플 (아빠) : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYyNzMyMzM5LCJzdWIiOiIxNiIsImV4cCI6MTY3ODI4NDMzOSwiaWQiOjE2LCJyb2xlcyI6IlVTRVIifQ.Xq1D3K03-_OmhdJRDtMPA8okaYkBO2QAka1LJ8vVAGw"
// 김민준 카카오 (엄마) : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYyNzE2MjIwLCJzdWIiOiIyIiwiZXhwIjoxNjc4MjY4MjIwLCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.ESHvIwFq_D4Kh7IJGVb3FYZvlZtjSkG_RefmzZ1EhNs"

// const initialState: IAuthState = {
//   auth: {
//     accessToken:
//       'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0MTMxNTcsInN1YiI6IjIiLCJleHAiOjE2NjI2MjI3NTcsImlkIjoyLCJyb2xlcyI6IlVTRVIifQ.ev6Jy4r-sgdOmASOLQ2aioMVhkYhXFZz3HXeyBzvYwU',
//     isKid: false,
//     provider: 'kakao',
//     level: null,
//     birthday: '',
//     username: '',
//     isFemale: null,
//     phone: null,
//     withdrawReason: '',
//   },
// };

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
    setWithdrawReason: (state, action: PayloadAction<string>) => {
      state.auth.withdrawReason = action.payload;
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

export const {
  setCredentials,
  resetCredentials,
  setBirthday,
  setLevel,
  setWithdrawReason,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectLevel = (state: RootState) => state.auth.auth.level;
export const selectBirthday = (state: RootState) => state.auth.auth.birthday;
export const selectProvider = (state: RootState) => state.auth.auth.provider;
export const selectWithdrawReason = (state: RootState) =>
  state.auth.auth.withdrawReason;

export default authSlice.reducer;

// https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit
// https://redux-toolkit.js.org/api/createAsyncThunk
