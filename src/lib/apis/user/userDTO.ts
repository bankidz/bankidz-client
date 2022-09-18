import { TLevel } from '@lib/types/TLevel';

export interface IMyPageDTO {
  user: IUserDTO;
  kid: IKidDTO | null;
  parent: IParentDTO | null;
}

export interface IUserDTO {
  username: string;
  isFemale: boolean;
  isKid: boolean;
  birthday: string;
  phone: string | null;
}

export interface IWithdrawalRequest {
  message: string;
}

export interface IUserTypeRequest
  extends Pick<IUserDTO, 'birthday' | 'isFemale' | 'isKid'> {}

export interface IKidDTO {
  achievedChallenge: number;
  totalChallenge: number;
  level: TLevel;
}

export interface IParentDTO {
  acceptedRequest: number;
  totalRequest: number;
}

/**
 * @noticeOptin : 공지 및 이벤트 알림 동의 여부
 * @serviceOptin : 가족 활동 알림 동의 여부
 * @updatedAt : 유저 데이터 마지막 수정 시점
 */
export interface IOptInDTO {
  noticeOptIn: boolean;
  serviceOptIn: boolean;
  updatedAt: string;
}
