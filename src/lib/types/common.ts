// level 6은 홈페이지 배경에서 임당뱅키 빼꼼을 위한것입니다.
export type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type TInterestRate = 10 | 20 | 30;

export type TChallengeCategory = '이자율 받기';

export enum EMoneyRoadStatus {
  REJECTED,
  PENDING,
  SUCCEEDED,
}
