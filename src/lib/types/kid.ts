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

export interface IFamilyState {
  username: string;
  isFemale: boolean;
  isKid: boolean;
}

export type TPercent = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
