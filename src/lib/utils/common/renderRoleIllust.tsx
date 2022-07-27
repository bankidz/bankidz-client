import { ReactComponent as BankiDad } from '@assets/illust/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illust/banki/banki_mom.svg';
import { ReactComponent as BankiSon } from '@assets/illust/banki/banki_son.svg';
import { ReactComponent as BankiDaughter } from '@assets/illust/banki/banki_daughter.svg';

function renderRoleIllust(isKid: boolean, isFemale: boolean) {
  if (isKid === false && isFemale === false) {
    return <BankiDad />;
  } else if (isKid === false && isFemale === true) {
    return <BankiMom />;
  } else if (isKid === true && isFemale === false) {
    return <BankiSon />;
  } else {
    return <BankiDaughter />;
  }
}

export default renderRoleIllust;
