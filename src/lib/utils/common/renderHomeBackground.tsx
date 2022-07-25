import { ReactComponent as Level1 } from '@assets/illust/homeBackground/Home_Background-1.svg';
import { ReactComponent as Level2 } from '@assets/illust/homeBackground/Home_Background-2.svg';
import { ReactComponent as Level3 } from '@assets/illust/homeBackground/Home_Background-3.svg';
import { ReactComponent as Level4 } from '@assets/illust/homeBackground/Home_Background-4.svg';
import { ReactComponent as Level5 } from '@assets/illust/homeBackground/Home_Background-5.svg';
import { ReactComponent as Level6 } from '@assets/illust/homeBackground/Home_Background-6.svg';
import { TLevel } from '@lib/types/common';

export function renderHomeBackground(level: TLevel) {
  if (level === 1) {
    return <Level1 />;
  } else if (level === 2) {
    return <Level2 />;
  } else if (level === 3) {
    return <Level3 />;
  } else if (level === 4) {
    return <Level4 />;
  } else if (level === 5) {
    return <Level5 />;
  } else if (level === 6) {
    return <Level6 />;
  }
}
