import { ReactComponent as Level1 } from '@assets/illusts/banki/Home_Banki-1.svg';
import { ReactComponent as Level2 } from '@assets/illusts/banki/Home_Banki-2.svg';
import { ReactComponent as Level3 } from '@assets/illusts/banki/Home_Banki-3.svg';
import { ReactComponent as Level4 } from '@assets/illusts/banki/Home_Banki-4.svg';
import { ReactComponent as Level5 } from '@assets/illusts/banki/Home_Banki-5.svg';
import { TLevel } from '@lib/types/TLevel';

function renderHomeBanki(level: TLevel) {
  let homeBanki;
  if (level === 1) {
    homeBanki = <Level1 />;
  } else if (level === 2) {
    homeBanki = <Level2 />;
  } else if (level === 3) {
    homeBanki = <Level3 />;
  } else if (level === 4 || level === -4) {
    homeBanki = <Level4 />;
  } else if (level === 5) {
    homeBanki = <Level5 />;
  }
  return homeBanki;
}

export default renderHomeBanki;
