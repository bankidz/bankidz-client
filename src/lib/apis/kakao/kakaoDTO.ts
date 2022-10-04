import { TLevel } from '@lib/types/TLevel';

export interface ILoginDTO {
  accessToken: string;
  isKid: boolean;
  level: TLevel;
  provider: string;
}

export interface IKakaoRequest {
  code: string;
}
