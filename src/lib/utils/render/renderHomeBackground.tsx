import { ReactComponent as Level1 } from '@assets/illusts/homeBackground/Home_Background-1.svg';
import { ReactComponent as Level2 } from '@assets/illusts/homeBackground/Home_Background-2.svg';
import { ReactComponent as Level3 } from '@assets/illusts/homeBackground/Home_Background-3.svg';
import { ReactComponent as Level4 } from '@assets/illusts/homeBackground/Home_Background-4.svg';
import { ReactComponent as Level5 } from '@assets/illusts/homeBackground/Home_Background-5.svg';
import { ReactComponent as LevelMinus4 } from '@assets/illusts/homeBackground/Home_Background-4-5.svg';
import { TLevel } from '@lib/types/TLevel';

function renderHomeBackground(level: TLevel) {
  const map = new Map<TLevel, React.ReactElement>();
  map.set(1, <Level1 />);
  map.set(2, <Level2 />);
  map.set(3, <Level3 />);
  map.set(4, <Level4 />);
  map.set(-4, <LevelMinus4 />);
  map.set(5, <Level5 />);
  return map.get(level);
}

export default renderHomeBackground;
