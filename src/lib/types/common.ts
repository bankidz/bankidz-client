export type TInterestRate = 10 | 20 | 30;

export type TChallengeCategory = '이자율 받기';

// level 6은 홈 페이지 뱅키임당 빼꼼 배경을 위한것입니다.
export type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

// 0: rejected / 1: pending / 2: succeeded
export type TMoneyRoadStatus = 0 | 1 | 2;

export enum EMoneyRoadStatus {
  REJECTED,
  PENDING,
  SUCCEEDED,
}
