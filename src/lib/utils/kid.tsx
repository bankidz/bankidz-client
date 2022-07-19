import { ReactComponent as BankiDad } from '@assets/illust/banki/banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illust/banki/banki_mom.svg';
import { ReactComponent as BankiSon } from '@assets/illust/banki/banki_son.svg';
import { ReactComponent as BankiDaughter } from '@assets/illust/banki/banki_daughter.svg';

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

import { ReactComponent as CongratsBankiDad } from '@assets/illust/congrats/congrats_banki_dad.svg';
import { ReactComponent as CongratsBankiMom } from '@assets/illust/congrats/congrats_banki_mom.svg';
import { ReactComponent as CongratsBankiSon } from '@assets/illust/congrats/congrats_banki_son.svg';
import { ReactComponent as CongratsBankiDaughter } from '@assets/illust/congrats/congrats_banki_daughter.svg';

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

import { ReactComponent as A1 } from '@assets/illust/contractItemNames/contractReceipt/a1.svg';
import { ReactComponent as A2 } from '@assets/illust/contractItemNames/contractReceipt/a2.svg';
import { ReactComponent as A3 } from '@assets/illust/contractItemNames/contractReceipt/a3.svg';
import { ReactComponent as B1 } from '@assets/illust/contractItemNames/contractReceipt/b1.svg';
import { ReactComponent as B2 } from '@assets/illust/contractItemNames/contractReceipt/b2.svg';
import { ReactComponent as B3 } from '@assets/illust/contractItemNames/contractReceipt/b3.svg';
import { ReactComponent as C1 } from '@assets/illust/contractItemNames/contractReceipt/c1.svg';
import { ReactComponent as C2 } from '@assets/illust/contractItemNames/contractReceipt/c2.svg';
import { ReactComponent as C3 } from '@assets/illust/contractItemNames/contractReceipt/c3.svg';
import { TItemName } from '@lib/types/kid';

export function renderContractItem(category: TItemName) {
  if (category === '학용품') {
    return <A1 />;
  } else if (category === '생활용품') {
    return <A2 />;
  } else if (category === '전자제품') {
    return <A3 />;
  } else if (category === '식품') {
    return <B1 />;
  } else if (category === '문화생활') {
    return <B2 />;
  } else if (category === '패션뷰티') {
    return <B3 />;
  } else if (category === '선물') {
    return <C1 />;
  } else if (category === '비상금') {
    return <C2 />;
  } else if (category === '기타') {
    return <C3 />;
  }
}
