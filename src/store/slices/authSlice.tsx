import { axiosPublic } from '@lib/api/axios';
import { TLevel } from '@lib/types/common';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TAuthState = {
  auth: {
    accessToken: string | null;
    isKid: boolean | null;
    level: TLevel | null;
    birthday: string | null;
    isFemale: boolean | null;
    phone: string | null;
    username: string | null;
  };
};

/*
 ** 아빠(신성우): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTE0NzM3LCJzdWIiOiI1IiwiZXhwIjoxNjYxMzMzOTM3LCJpZCI6NSwicm9sZXMiOiJVU0VSIn0.lQX8aymHJXp8wXcgcix9x32ZQCwjP2arI3WEPvLLRRk
 ** 엄마(김민준): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTE0NzY1LCJzdWIiOiIyIiwiZXhwIjoxNjYxMzMzOTY1LCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.f2B_gezGmD6uKh2Js3Y_blrLJGOFyWXzqva5MAXmbqc
 ** 아들(한규진): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTkwMDAwLCJzdWIiOiI0IiwiZXhwIjoxNjYxNDA5MjAwLCJpZCI6NCwicm9sZXMiOiJVU0VSIn0.Sad0Wtg4-T8tW-m4OoGQZBCbWCO8D5S1YwZIjoHfGw0
 ** 딸(주어진): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTkwMDYxLCJzdWIiOiIzIiwiZXhwIjoxNjYxNDA5MjYxLCJpZCI6Mywicm9sZXMiOiJVU0VSIn0.iiMmsuks0oWYctTmKt0fEJgacIl13XNSoAjyY6Jd7QU
 */

const initialState: TAuthState = {
  auth: {
    accessToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTE0NzM3LCJzdWIiOiI1IiwiZXhwIjoxNjYxMzMzOTM3LCJpZCI6NSwicm9sZXMiOiJVU0VSIn0.lQX8aymHJXp8wXcgcix9x32ZQCwjP2arI3WEPvLLRRk',
    isKid: false,
    level: null,
    birthday: null,
    isFemale: null,
    phone: null,
    username: null,
  },
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
  level: TLevel | null;
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

export default authSlice.reducer;
