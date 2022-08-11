import { TLevel } from '@lib/types/TLevel';

function getBankiNameByLevel(level: TLevel) {
  if (level === 1) {
    return 'Lv.1 뱅키학';
  } else if (level === 2) {
    return 'Lv.2 태계뱅키';
  } else if (level === 3) {
    return 'Lv.3 율곡뱅키';
  } else if (level === 4 || level === -4 || level === 0) {
    // TODO: 백 수정 이후 level: 0인 경우 삭제
    return 'Lv.4 뱅키대왕';
  } else if (level === 5) {
    return 'Lv.5 뱅키임당';
  }
}

export default getBankiNameByLevel;
