import { theme } from '@lib/styles/theme';

function getColorByLevel(level: 1 | 2 | 3 | 4 | 5 | null): string {
  switch (level) {
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
