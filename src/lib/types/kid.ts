// 자녀 파트 개발 도중에는 일단 kid에 전부 작성하고 추후 부모 파트 작업하게 되면
// types/kid, types/parent, types/common으로 나누었으면 좋겠습니다.

export interface IRoleDependency {
  isKid: boolean | null;
  isFemale: boolean | null;
}

export type TItemName =
  | '학용품'
  | '생활용품'
  | '전자제품'
  | '식품'
  | '문화생활'
  | '패션뷰티'
  | '선물'
  | '비상금'
  | '기타';

// 0: rejected / 1: pending / 2: succeeded
export type TMoneyRoadStatus = 0 | 1 | 2;

export interface IFamilyState {
  username: string;
  isFemale: boolean;
  isKid: boolean;
}
