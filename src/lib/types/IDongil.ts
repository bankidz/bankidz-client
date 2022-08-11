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
  isAchieved: number;
  interestRate: TInterestRate;
  totalPrice: number;
  weekPrice: number;
  successWeeks: number;
  weeks: number;
  createdAt: string;
  status: TDongilStatus;
  fileName: string;
  progressList:
    | {
        challengeId: number;
        weeks: number;
        isAchieved: boolean;
        // 저축 챌린지 계약 종료일, 추후 Enum으로 프백 통일 예정
        approvedAt: string;
      }[]
    | null;
  comment: {
    content: string;
    id: number;
  } | null;
}
