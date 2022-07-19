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
