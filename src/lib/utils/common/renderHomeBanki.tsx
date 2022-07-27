import { ReactComponent as Level1 } from '@assets/illusts/banki/Home_Banki-1.svg';
import { ReactComponent as Level2 } from '@assets/illusts/banki/Home_Banki-2.svg';
import { ReactComponent as Level3 } from '@assets/illusts/banki/Home_Banki-3.svg';
import { ReactComponent as Level4 } from '@assets/illusts/banki/Home_Banki-4.svg';
import { ReactComponent as Level5 } from '@assets/illusts/banki/Home_Banki-5.svg';
import { TLevel } from '@lib/types/common';

function renderHomeBanki(level: TLevel) {
  if (level === 1) {
    return <Level1 />;
  } else if (level === 2) {
    return <Level2 />;
  } else if (level === 3) {
    return <Level3 />;
  } else if (level === 4 || level === 6) {
    return <Level4 />;
  } else if (level === 5) {
    return <Level5 />;
  }
}

export default renderHomeBanki;
