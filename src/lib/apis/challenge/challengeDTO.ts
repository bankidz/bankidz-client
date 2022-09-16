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

export interface IDongilDTO {
  challengeCategory: string;
  challengeStatus: TDongilStatus;
  comment: {
    content: string;
    id: number;
  };
  createdAt: string;
  fileName: string;
  interestPrice: number;
  interestRate: number;
  isMom: boolean;
  itemName: TItemName;
  progressList: IDongilDTO[];
  successWeeks: number;
  title: string;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
}
