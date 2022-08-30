import { IFamilyState } from '@lib/types/IFamilyState';
import { IKid } from '@lib/types/IKid';

export interface IFamilyDTO {
  id: number;
  code: string;
  familyUserList: IFamilyState[];
}

export interface IKidListDTO extends IKid {
  savings: number;
  achievedChallenge: number;
  totalChallenge: number;
}

export interface IFamilyGroupPayload {
  code: string;
}
