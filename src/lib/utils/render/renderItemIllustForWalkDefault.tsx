import { ReactComponent as A1 } from '@assets/illusts/contractItemNames/walk/a1.svg';
import { ReactComponent as A2 } from '@assets/illusts/contractItemNames/walk/a2.svg';
import { ReactComponent as A3 } from '@assets/illusts/contractItemNames/walk/a3.svg';
import { ReactComponent as B1 } from '@assets/illusts/contractItemNames/walk/b1.svg';
import { ReactComponent as B2 } from '@assets/illusts/contractItemNames/walk/b2.svg';
import { ReactComponent as B3 } from '@assets/illusts/contractItemNames/walk/b3.svg';
import { ReactComponent as C1 } from '@assets/illusts/contractItemNames/walk/c1.svg';
import { ReactComponent as C2 } from '@assets/illusts/contractItemNames/walk/c2.svg';
import { ReactComponent as C3 } from '@assets/illusts/contractItemNames/walk/c3.svg';
import { TItemName } from '@lib/types/TItemName';

function renderItemIllustForWalkDefault(itemName: TItemName) {
  let itemIllustForWalkDefault;
  if (itemName === '학용품') {
    itemIllustForWalkDefault = <A1 />;
  } else if (itemName === '생활용품') {
    itemIllustForWalkDefault = <A2 />;
  } else if (itemName === '전자제품') {
    itemIllustForWalkDefault = <A3 />;
  } else if (itemName === '식품') {
    itemIllustForWalkDefault = <B1 />;
  } else if (itemName === '문화생활') {
    itemIllustForWalkDefault = <B2 />;
  } else if (itemName === '패션뷰티') {
    itemIllustForWalkDefault = <B3 />;
  } else if (itemName === '선물') {
    itemIllustForWalkDefault = <C1 />;
  } else if (itemName === '비상금') {
    itemIllustForWalkDefault = <C2 />;
  } else if (itemName === '기타') {
    itemIllustForWalkDefault = <C3 />;
  }
}

export default renderItemIllustForWalkDefault;
