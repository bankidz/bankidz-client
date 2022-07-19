import { ReactComponent as BankiDad } from '@assets/illust/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illust/banki/banki_mom.svg';
import { ReactComponent as BankiSon } from '@assets/illust/banki/banki_son.svg';
import { ReactComponent as BankiDaughter } from '@assets/illust/banki/banki_daughter.svg';
import { ReactComponent as CongratsBankiDad } from '@assets/illust/congrats/congrats_banki_dad.svg';
import { ReactComponent as CongratsBankiMom } from '@assets/illust/congrats/congrats_banki_mom.svg';
import { ReactComponent as CongratsBankiSon } from '@assets/illust/congrats/congrats_banki_son.svg';
import { ReactComponent as CongratsBankiDaughter } from '@assets/illust/congrats/congrats_banki_daughter.svg';

export function renderRoleIllust(
  isKid: boolean | null,
  isFemale: boolean | null,
) {
  if (!isKid && !isFemale) {
    return <BankiDad />;
  } else if (!isKid && isFemale) {
    return <BankiMom />;
  } else if (isKid && !isFemale) {
    return <BankiSon />;
  } else {
    return <BankiDaughter />;
  }
}

export function renderRoleText(
  isKid: boolean | null,
  isFemale: boolean | null,
) {
  if (!isKid && !isFemale) {
    return '아빠';
  } else if (!isKid && isFemale) {
    return '엄마';
  } else if (isKid && !isFemale) {
    return '아들';
  } else {
    return '딸';
  }
}

export function renderCongratsIllust(
  isKid: boolean | null,
  isFemale: boolean | null,
) {
  if (!isKid && !isFemale) {
    return <CongratsBankiDad />;
  } else if (!isKid && isFemale) {
    return <CongratsBankiMom />;
  } else if (isKid && !isFemale) {
    return <CongratsBankiSon />;
  } else {
    return <CongratsBankiDaughter />;
  }
}
