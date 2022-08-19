import { ReactComponent as A1 } from '@assets/illusts/contractItemNames/general/a1.svg';
import { ReactComponent as A2 } from '@assets/illusts/contractItemNames/general/a2.svg';
import { ReactComponent as A3 } from '@assets/illusts/contractItemNames/general/a3.svg';
import { ReactComponent as B1 } from '@assets/illusts/contractItemNames/general/b1.svg';
import { ReactComponent as B2 } from '@assets/illusts/contractItemNames/general/b2.svg';
import { ReactComponent as B3 } from '@assets/illusts/contractItemNames/general/b3.svg';
import { ReactComponent as C1 } from '@assets/illusts/contractItemNames/general/c1.svg';
import { ReactComponent as C2 } from '@assets/illusts/contractItemNames/general/c2.svg';
import { ReactComponent as C3 } from '@assets/illusts/contractItemNames/general/c3.svg';
import { TItemName } from '@lib/types/TItemName';

function renderItemIllust(itemName: TItemName) {
  let itemIllust;
  if (itemName === '학용품') {
    itemIllust = <A1 />;
  } else if (itemName === '생활용품') {
    itemIllust = <A2 />;
  } else if (itemName === '전자제품') {
    itemIllust = <A3 />;
  } else if (itemName === '식품') {
    itemIllust = <B1 />;
  } else if (itemName === '문화생활') {
    itemIllust = <B2 />;
  } else if (itemName === '패션뷰티') {
    itemIllust = <B3 />;
  } else if (itemName === '선물') {
    itemIllust = <C1 />;
  } else if (itemName === '비상금') {
    itemIllust = <C2 />;
  } else if (itemName === '기타') {
    itemIllust = <C3 />;
  }
  return itemIllust;
}

export default renderItemIllust;
