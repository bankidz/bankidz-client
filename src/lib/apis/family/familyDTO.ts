import { TLevel } from '@lib/types/TLevel';

export interface IFamilyDTO {
  id: number;
  code: string;
  familyUserList: IFamilyUserDTO[];
}

export interface IFamilyUserDTO {
  username: string;
  isFemale: boolean;
  isKid: boolean;
}

export interface IKidListDTO {
  achievedChallenge: number;
  isFemale: boolean;
  kidId: number;
  level: TLevel;
  savings: number;
  totalChallenge: number;
  username: string;
}

export interface IFamilyGroupPayload {
  code: string;
}
