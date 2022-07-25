import { axiosPublic } from '@lib/api/axios';
import { TRequestStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TAuthState = {
  auth: {
    accessToken: string | null;
    isKid: boolean | null;
    level: 1 | 2 | 3 | 4 | 5 | null;
    birthday: string | null;
    isFemale: boolean | null;
    phone: string | null;
    username: string | null;
  };
  authRequestStatus: TRequestStatus;
};

// 김원진 엄마
// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4MDM1ODc2LCJzdWIiOiIyIiwiZXhwIjoxNjYwNDU1MDc2LCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.KXzamQgcDWrLw3MAkPzewQI_hK9NCzGa3z8GcLeH-p8',
// 주어진 딸
// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4NzI3NzkxLCJzdWIiOiI2IiwiZXhwIjoxNjU4NzI3ODIxLCJpZCI6Niwicm9sZXMiOiJVU0VSIn0.G9UwEE7nBmsYka3XT-HQ0AWWDOs3y47O3kZEmr1-b64',
const initialState: TAuthState = {
  auth: {
    // accessToken: null,
    accessToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4NzI3NzkxLCJzdWIiOiI2IiwiZXhwIjoxNjU4NzI3ODIxLCJpZCI6Niwicm9sZXMiOiJVU0VSIn0.G9UwEE7nBmsYka3XT-HQ0AWWDOs3y47O3kZEmr1-b64',
    // isKid: null,
    isKid: true,
    level: null,
    birthday: null,
    isFemale: null,
    phone: null,
    username: null,
  },
  authRequestStatus: 'idle', // for GET method
};

// POST: 카카오 서버로부터 받은 인증코드를 뱅키즈 서버로 전송
export const login = createAsyncThunk(
  'auth/login',
  async (thunkPayload: { code: string | null }) => {
    const { code } = thunkPayload;
    const response = await axiosPublic.post('/kakao/login', {
      code,
    });
    return response.data;
  },
);

// PATCH: 생년월일과 역할 정보가 없는 회원에 대해 입력받은 정보를 서버로 전송
export const register = createAsyncThunk(
  'auth/register',
  async (thunkPayload: {
    axiosPrivate: AxiosInstance;
    birthday: string | null;
    isFemale: boolean | null;
    isKid: boolean | null;
  }) => {
    console.log(thunkPayload);
    const { axiosPrivate, birthday, isFemale, isKid } = thunkPayload;
    const response = await axiosPrivate.patch('/user', {
      birthday,
      isFemale,
      isKid,
    });
    return response.data;
  },
);

interface IAuth {
  accessToken: string | null;
  isKid: boolean | null;
  level: 1 | 2 | 3 | 4 | 5 | null;
}
interface IBirthDay {
  birthday: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuth>) => {
      const { accessToken, isKid, level } = action.payload;
      state.auth.accessToken = accessToken;
      state.auth.isKid = isKid;
      state.auth.level = level;
    },
    resetCredentials: (state) => {
      state.auth.accessToken = null;
      state.auth.isKid = null;
      state.auth.level = null;
    },
    setBirthday: (state, action: PayloadAction<IBirthDay>) => {
      const { birthday } = action.payload;
      state.auth.birthday = birthday;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, isKid, level } = action.payload.data;
        state.auth.accessToken = accessToken;
        state.auth.isKid = isKid;
        state.auth.level = level;
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
export const selectIsFemale = (state: RootState) => state.auth.auth.isFemale;
export const selectPhone = (state: RootState) => state.auth.auth.phone;
export const selectUsername = (state: RootState) => state.auth.auth.username;

export default authSlice.reducer;

// const response = await axiosPublic.get('/health');
// console.log(response.data);
