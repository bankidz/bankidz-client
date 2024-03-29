import { toast } from 'react-toastify';
import navigateToHome from '@lib/utils/navigateToHome';
import navigateToMypage from '@lib/utils/navigateToMypage';

/** default handler */
export const handle403default = () => {
  toast.error('권한이 없어요. 홈으로 이동합니다.', {
    onClose: navigateToHome,
  });
};

export const handle403_30002 = () => {
  toast.error('부모만 자녀의 정보를 조회할 수 있어요.');
};

export const handle403_30005 = () => {
  toast.error('가족그룹에 엄마가 이미 존재해요.', {
    onClose: navigateToMypage,
  });
};

export const handle403_30006 = () => {
  toast.error('가족그룹에 아빠가 이미 존재해요.', {
    onClose: navigateToMypage,
  });
};

export const handle403_30007 = () => {
  toast.error('이미 가족그룹에 속해있어요.', {
    onClose: navigateToMypage,
  });
};

export const handle403_40001 = () => {
  toast.error('돈길은 최대 5개까지 계약할 수 있어요.');
};

export const handle403_40002 = () => {
  toast.error('가족 정보가 유효하지 않아요.');
};

export const handle403_40007 = () => {
  toast.error('돈길 포기는 2주에 1개만 가능해요.');
};

export const handle403_40012 = () => {
  toast.error('돈길은 최대 5개까지 계약할 수 있어요.');
};

export const handle403_40014 = () => {
  toast.error('일요일에는 불가능한 요청이에요.');
};
