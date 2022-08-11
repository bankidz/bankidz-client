import { theme } from '@lib/styles/theme';
import { TLevel } from '@lib/types/TLevel';

function getColorByLevel(level: TLevel): string {
  switch (level) {
    case 1:
      return theme.palette.level.grey100;
    case 2:
      return theme.palette.level.blue100;
    case 3:
      return theme.palette.level.red100;
    case 4:
      return theme.palette.level.green100;
    case -4:
      return theme.palette.level.green100;
    // TODO: 백 수정 이후 level: 0인 경우 삭제
    case 0:
      return theme.palette.level.green100;
    case 5:
      return theme.palette.level.yellow100;
    default:
      // level: undefined (홈화면 level fetch 직전)
      return theme.palette.greyScale.grey100;
  }
}

export default getColorByLevel;
