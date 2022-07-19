import { ReactComponent as BankiDad } from '@assets/illust/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illust/banki/banki_mom.svg';
import { ReactComponent as BankiSon } from '@assets/illust/banki/banki_son.svg';
import { ReactComponent as BankiDaughter } from '@assets/illust/banki/banki_daughter.svg';
import { ReactComponent as CongratsBankiDad } from '@assets/illust/congrats/congrats_banki_dad.svg';
import { ReactComponent as CongratsBankiMom } from '@assets/illust/congrats/congrats_banki_mom.svg';
import { ReactComponent as CongratsBankiSon } from '@assets/illust/congrats/congrats_banki_son.svg';
import { ReactComponent as CongratsBankiDaughter } from '@assets/illust/congrats/congrats_banki_daughter.svg';
import { TRoleDependency } from '@lib/types/kid';

export function renderRoleIllust(
  isKid: boolean | null,
  isFemale: boolean | null,
) {
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

export function renderRoleText(
  isKid: boolean | null,
  isFemale: boolean | null,
) {
  if (isKid === false && isFemale === false) {
    return '아빠';
  } else if (isKid === false && isFemale === true) {
    return '엄마';
  } else if (isKid === true && isFemale === false) {
    return '아들';
  } else {
    return '딸';
  }
}

export function renderCongratsIllust(
  isKid: boolean | null,
  isFemale: boolean | null,
) {
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
