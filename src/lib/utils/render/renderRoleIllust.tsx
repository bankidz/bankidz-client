import { ReactComponent as BankiDad } from '@assets/illusts/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illusts/banki/banki_mom.svg';
import { ReactComponent as BankiSon } from '@assets/illusts/banki/banki_son.svg';
import { ReactComponent as BankiDaughter } from '@assets/illusts/banki/banki_daughter.svg';

function renderRoleIllust(isKid: boolean, isFemale: boolean) {
  let roleIllust;
  if (isKid === false && isFemale === false) {
    roleIllust = <BankiDad />;
  } else if (isKid === false && isFemale === true) {
    roleIllust = <BankiMom />;
  } else if (isKid === true && isFemale === false) {
    roleIllust = <BankiSon />;
  } else {
    roleIllust = <BankiDaughter />;
  }
  return roleIllust;
}

export default renderRoleIllust;
