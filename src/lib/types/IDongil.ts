import { TInterestRate } from './IInterestRate';
import { TDongilCategory } from './TDongilCategory';
import { TDongilStatus } from './TDongilStatus';
import { TItemName } from './TItemName';

export interface IDongil {
  id: number;
  isMom: boolean;
  title: string;
  itemName: TItemName;
  challengeCategory: TDongilCategory;
  challengeStatus: TDongilStatus;
  interestRate: TInterestRate;
  totalPrice: number;
  weekPrice: number;
  successWeeks: number;
  weeks: number;
  createdAt: string;
  fileName: string;
  progressList:
    | {
        challengeId: number;
        weeks: number;
        isAchieved: boolean;
        approvedAt: string;
      }[]
    | null;
  comment: {
    content: string;
    id: number;
  } | null;
}
