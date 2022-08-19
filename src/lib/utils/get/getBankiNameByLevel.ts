import { TLevel } from '@lib/types/TLevel';

function getBankiNameByLevel(level: TLevel) {
  let bankiNameByLevel;
  if (level === 1) {
    bankiNameByLevel = 'Lv.1 뱅키학';
  } else if (level === 2) {
    bankiNameByLevel = 'Lv.2 태계뱅키';
  } else if (level === 3) {
    bankiNameByLevel = 'Lv.3 율곡뱅키';
  } else if (level === 4 || level === -4) {
    bankiNameByLevel = 'Lv.4 뱅키대왕';
  } else if (level === 5) {
    bankiNameByLevel = 'Lv.5 뱅키임당';
  }
  return bankiNameByLevel;
}

export default getBankiNameByLevel;
