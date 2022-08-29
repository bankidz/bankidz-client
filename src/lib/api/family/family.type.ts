import { IFamilyState } from '@lib/types/IFamilyState';
import { IKid } from '@lib/types/IKid';

export interface IGetFamilyResData {
  id: number;
  code: string;
  familyUserList: IFamilyState[];
}

export interface IGetKidResDataItem extends IKid {
  savings: number;
  achievedChallenge: number;
  totalChallenge: number;
}

export interface IDeleteFamilyPayload {
  code: string;
}
