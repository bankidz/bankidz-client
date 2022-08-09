// 백엔드 리팩토링 이후 enum으로 통합 예정
// 0: rejected / 1: pending / 2: succeeded
export type TDongilStatus = 0 | 1 | 2;

export enum EDongilStatus {
  REJECTED,
  PENDING,
  SUCCEEDED,
}
