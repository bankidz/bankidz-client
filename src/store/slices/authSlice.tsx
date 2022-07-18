import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import { TReduxStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
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
  status: TReduxStatus;
  error: string | undefined;
};

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
  status: 'idle',
  error: undefined,
};

// PATCH: 생년월일과 역할 정보가 없는 회원에 대해 입력받은 정보를 서버로 전송
export const register = createAsyncThunk(
  'auth/register',
  async (thunkPayload: {
    axiosPrivate: any;
    // axiosPublic: any;
    birthday: string | null;
    isKid: boolean | null;
    isFemale: boolean | null;
  }) => {
    try {
      console.log('in thunk:', thunkPayload);
      // console.log(`in thunk: ${JSON.stringify(thunkPayload)}`);
      // const response = await thunkPayload.axiosPublic.get('/health');
      const response = await thunkPayload.axiosPrivate.get('/user');
      // const response = await thunkPayload.axiosPrivate.patch('/user', {
      //   birthday: thunkPayload.birthday,
      //   isKid: thunkPayload.isKid,
      //   isFemale: thunkPayload.isFemale,
      // });
      console.log(`res: ${response.data}`);
      console.log(`asdfasdf`);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      if (axios.isAxiosError(error)) {
        return error.message;
      }
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
      state.auth.accessToken = action.payload.accessToken;
      state.auth.isKid = action.payload.isKid;
    },
    resetCredentials: (state) => {
      state.auth.accessToken = null;
      state.auth.isKid = null;
    },
    setBirthday: (state, action: PayloadAction<IBirthDay>) => {
      state.auth.birthday = action.payload.birthday;
    },
    setRole: (state, action: PayloadAction<IRole>) => {
      state.auth.isKid = action.payload.isKid;
      state.auth.isFemale = action.payload.isFemale;
    },
  },
  extraReducers(builder) {
    builder.addCase(register.fulfilled, (state, action) => {
      // state.auth.accessToken = action.payload.username;
      // state.auth.isFemale = action.payload.isFemale;
      // state.auth.isKid = action.payload.isKid;
      // state.auth.birthday = action.payload.birthday;
      // state.auth.phone = action.payload.phone;
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

// https://github.com/gitdagray/redux_jwt_auth/blob/main/src/features/auth/authSlice.js
// https://github.com/Neogasogaeseo/Naega-Web/blob/dev/src/presentation/pages/OAuthRedirectHandler/index.tsx
// https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional
// https://kyounghwan01.github.io/blog/TS/object-null/#%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5
// https://stackoverflow.com/questions/61339968/error-message-devtools-failed-to-load-sourcemap-could-not-load-content-for-chr
// https://velog.io/@lieblichoi/%ED%81%AC%EB%A1%ACChrome-DevTools-failed-to-load-source-map-Could-not-load-content-for-%EC%88%A8%EA%B8%B0%EA%B8%B0
