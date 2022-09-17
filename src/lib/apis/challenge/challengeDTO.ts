import { TInterestRate } from '@lib/types/IInterestRate';
import { TDongilCategory } from '@lib/types/TDongilCategory';
import { TDongilStatus } from '@lib/types/TDongilStatus';
import { TItemName } from '@lib/types/TItemName';

export interface IProgressDTO {
  approvedAt: string;
  challengeId: number;
  challengeStatus: TDongilStatus;
  isAchieved: boolean;
  weeks: number;
}

export interface IChallengeDTO {
  challengeCategory: TDongilCategory;
  challengeStatus: TDongilStatus;
  comment: {
    content: string;
    id: number;
  };
  createdAt: string;
  fileName: string;
  id: number;
  interestPrice: number;
  interestRate: TInterestRate;
  isMom: boolean;
  itemName: TItemName;
  progressList: IProgressDTO[];
  successWeeks: number;
  title: string;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
}

export interface IChallengeRequest
  extends Pick<
    IChallengeDTO,
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

export interface IPatchChallengePayload extends IKidChallengeRequest {
  challengeId: number;
}

export interface IAchievedChallengeDTO {
  challenge: IChallengeDTO;
  interestPrice: number;
}
export interface IAchievedChallengeListDTO {
  challengeDTOList: IAchievedChallengeDTO[];
  totalInterestPrice: number;
}

export interface IKidChallengeListDTO {
  challengeList: IChallengeDTO[];
  kidId: number;
}

export interface IKidAchievedChallengeListDTO {
  achievedChallengeListDTO: IAchievedChallengeListDTO;
  kidId: number;
}

export interface IWeekDTO {
  currentSavings: number;
  totalPrice: number;
}

export interface IKidWeekDTO {
  kidId: number;
  weekInfo: IWeekDTO;
}
