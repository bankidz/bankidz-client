import { TInterestRate } from '@lib/types/IInterestRate';
import { TDongilCategory } from '@lib/types/TDongilCategory';
import { TDongilStatus } from '@lib/types/TDongilStatus';
import { TItemName } from '@lib/types/TItemName';
import { number } from 'prop-types';

export interface IProgressDTO {
  approvedAt: string;
  challengeId: number;
  challengeStatus: TDongilStatus;
  isAchieved: boolean;
  weeks: number;
}

export interface IDongilDTO {
  challengeCategory: TDongilCategory;
  challengeStatus: TDongilStatus;
  comment: {
    content: string;
    id: number;
  };
  createdAt: string;
  fileName: string;
  interestPrice: number;
  interestRate: TInterestRate;
  isMom: boolean;
  itemName: TItemName;
  progressList: IDongilDTO[];
  successWeeks: number;
  title: string;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
}

export interface IChallengeRequest
  extends Pick<
    IDongilDTO,
    | 'challengeCategory'
    | 'fileName'
    | 'interestPrice'
    | 'interestRate'
    | 'isMom'
    | 'itemName'
    | 'title'
    | 'totalPrice'
    | 'weekPrice'
    | 'weeks'
  > {}

export interface IKidChallengeRequest {
  accept: boolean;
  comment: string;
}

// 완주한 돈길 관련 API response DTO
// 완주한 돈길 리스트 DTO
export interface IAchievedDongilDTO {
  challenge: IDongilDTO;
  interestPrice: number;
}

export interface IKidDongilDTO {
  challengeList: IDongilDTO[];
  kidId: number;
}

export interface IKidAchievedDongilDTO {
  achievedChallengeListDTO: IAchievedDongilDTO;
  kidId: number;
}
