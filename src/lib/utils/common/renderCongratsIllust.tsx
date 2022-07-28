import { ReactComponent as CongratsBankiDad } from '@assets/illusts/congrats/congrats_banki_dad.svg';
import { ReactComponent as CongratsBankiMom } from '@assets/illusts/congrats/congrats_banki_mom.svg';
import { ReactComponent as CongratsBankiSon } from '@assets/illusts/congrats/congrats_banki_son.svg';
import { ReactComponent as CongratsBankiDaughter } from '@assets/illusts/congrats/congrats_banki_daughter.svg';

function renderCongratsIllust(isKid: boolean, isFemale: boolean) {
  if (isKid === false && isFemale === false) {
    return <CongratsBankiDad />;
  } else if (isKid === false && isFemale === true) {
    return <CongratsBankiMom />;
  } else if (isKid === true && isFemale === false) {
    return <CongratsBankiSon />;
  } else {
    return <CongratsBankiDaughter />;
  }
}

export default renderCongratsIllust;
