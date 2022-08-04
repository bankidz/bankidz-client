import { theme } from '@lib/styles/theme';
import { TLevel } from '@lib/types/common';

function getColorByLevel(level: TLevel | null): string {
  switch (level) {
    case 0:
      return theme.palette.level.green100;
    case 1:
      return theme.palette.level.grey100;
    case 2:
      return theme.palette.level.blue100;
    case 3:
      return theme.palette.level.red100;
    case 4:
      return theme.palette.level.green100;
    case 5:
      return theme.palette.level.yellow100;
    default:
      return theme.palette.level.grey100;
  }
}

export default getColorByLevel;
