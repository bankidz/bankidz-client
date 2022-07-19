import { TRequestStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

type TAuthState = {
  auth: {
    accessToken: string | null;
    isKid: boolean | null;
    isFemale: boolean | null;
    birthday: string | null;
    username: string | null;
    phone: string | null;
  };
  requestStatus: TRequestStatus;
  error: string | undefined;
};

// 김원진: 규진의 엄마
const initialState: TAuthState = {
  auth: {
    accessToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4MDM1ODc2LCJzdWIiOiIyIiwiZXhwIjoxNjYwNDU1MDc2LCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.KXzamQgcDWrLw3MAkPzewQI_hK9NCzGa3z8GcLeH-p8',
    // accessToken: null,
    // isKid: true,
    isKid: null,
    isFemale: null,
    birthday: null,
    username: null,
    phone: null,
  },
  requestStatus: 'idle',
  error: undefined,
};

// PATCH: 생년월일과 역할 정보가 없는 회원에 대해 입력받은 정보를 서버로 전송
export const register = createAsyncThunk(
  'auth/register',
  async (thunkPayload: {
    axiosPrivate: AxiosInstance;
    birthday: string | null;
    isKid: boolean | null;
    isFemale: boolean | null;
  }) => {
    const { axiosPrivate, birthday, isKid, isFemale } = thunkPayload;
    try {
      const response = await axiosPrivate.patch('/user', {
        birthday,
        isKid,
        isFemale,
      });
      // const response = await axiosPublic('/health');
      // const response = await axiosPrivate('/user');
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
);

interface IAuth {
  accessToken: string | null;
  isKid: boolean | null;
}
interface IBirthDay {
  birthday: string;
}
interface IRole {
  isKid: boolean;
  isFemale: boolean;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuth>) => {
      const { accessToken, isKid } = action.payload;
      state.auth.accessToken = accessToken;
      state.auth.isKid = isKid;
    },
    resetCredentials: (state) => {
      state.auth.accessToken = null;
      state.auth.isKid = null;
    },
    setBirthday: (state, action: PayloadAction<IBirthDay>) => {
      const { birthday } = action.payload;
      state.auth.birthday = birthday;
    },
    setRole: (state, action: PayloadAction<IRole>) => {
      const { isKid, isFemale } = action.payload;
      state.auth.isKid = isKid;
      state.auth.isFemale = isFemale;
    },
  },
  extraReducers(builder) {
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload.username) {
        console.error(action.payload.message);
        return;
      }
      const { username, isFemale, isKid, birthday, phone } = action.payload;
      state.auth.accessToken = action.payload.username;
      state.auth.isFemale = action.payload.isFemale;
      state.auth.isKid = action.payload.isKid;
      state.auth.birthday = action.payload.birthday;
      state.auth.phone = action.payload.phone;
    });
  },
});

export const { setCredentials, resetCredentials, setBirthday, setRole } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;

export default authSlice.reducer;
