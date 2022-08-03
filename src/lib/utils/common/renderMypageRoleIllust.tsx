import { ReactComponent as BankiDad } from '@assets/illusts/mypage/mypage_banki_dad.svg';
import { ReactComponent as BankiMom } from '@assets/illusts/mypage/mypage_banki_mom.svg';
import { ReactComponent as BankiSon } from '@assets/illusts/mypage/mypage_banki_son.svg';
import { ReactComponent as BankiDaughter } from '@assets/illusts/mypage/mypage_banki_daughter.svg';

function renderMypageRoleIllust(isKid: boolean, isFemale: boolean) {
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

export default renderMypageRoleIllust;
