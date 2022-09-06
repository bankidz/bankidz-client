import { TLevel } from '@lib/types/TLevel';

export interface IGetUserResData {
  user: TUser;
  kid: {
    achievedChallenge: number;
    totalChallenge: number;
    level: TLevel;
  } | null;
  parent: {
    acceptedRequest: number;
    totalRequest: number;
  } | null;
}

/* authSlice 파일안에 이미 있는것 확인했는데, 서버상태 관련한 타입은 api 디렉토리 하에서 관리하는게 어떠신가요
일단 중복으로 만들어둘게요.  */
export type TUser = {
  username: string;
  isFemale: boolean;
  isKid: boolean;
  birthday: string;
  phone: string | null;
};
