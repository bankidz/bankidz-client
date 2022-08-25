import { TLevel } from '@lib/types/TLevel';

function getBankiNameByLevel(level: TLevel) {
  const map = new Map<TLevel, string>();
  map.set(1, 'Lv.1 뱅키학');
  map.set(2, 'Lv.2 태계뱅키');
  map.set(3, 'Lv.3 율곡뱅키');
  map.set(4, 'Lv.4 뱅키대왕');
  map.set(-4, 'Lv.4 뱅키대왕');
  map.set(5, 'Lv.5 뱅키임당');
  return map.get(level);
}

export default getBankiNameByLevel;
