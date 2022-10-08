import { toast } from 'react-toastify';
import navigateToHome from '@lib/utils/navigateToHome';
import logoutClient from '@lib/utils/handleLogout';

/** default handler */
export const handle400default = () => {
  toast.error('적절하지 않은 요청이에요.', {
    onClose: navigateToHome,
  });
};

/** service code handler */
export const handle400_10001 = () => {
  toast.error('로그인에 실패했어요. 다시 시도해주세요.', {
    onClose: logoutClient,
  });
};

export const handle400_10002 = () => {
  toast.error('로그인에 실패했어요. 다시 시도해주세요.', {
    onClose: logoutClient,
  });
};

export const handle400_20002 = () => {
  toast.error('이미 프로필을 선택했어요. 홈으로 이동합니다.', {
    onClose: navigateToHome,
  });
};

export const handle400_20003 = () => {
  toast.error('생년월일이 유효하지 않아요.');
};

export const handle400_20004 = () => {
  toast.error('프로필 정보가 없어요. 온보딩으로 이동합니다.', {
    onClose: () => {
      window.location.href = '/auth/register/1';
    },
  });
};

export const handle400_30003 = () => {
  toast.error('그룹링크가 유효하지 않아요.');
};

export const handle400_30004 = () => {
  toast.error('프로필 정보가 유효하지 않아요.');
};

export const handle400_30008 = () => {
  toast.error('가족 정보가 유효하지 않아요.');
};

export const handle400_30009 = () => {
  toast.error('가족 정보가 유효하지 않아요.');
};

export const handle400_30010 = () => {
  toast.error(
    '이미 가족그룹에 속해있어요. 그룹 나가기 후 새 가족그룹을 만들어주세요.',
  );
};

export const handle400_40003 = () => {
  toast.error('계약 대상 부모가 유효하지 않아요.');
};

export const handle400_40004 = () => {
  toast.error('카테고리가 유효하지 않아요.');
};

export const handle400_40005 = () => {
  toast.error('계약상품이 유효하지 않아요.');
};

export const handle400_40008 = () => {
  toast.error('돈길이 유효하지 않아요.');
};

export const handle400_40009 = () => {
  toast.error('돈길이 유효하지 않아요.');
};

export const handle400_40011 = () => {
  toast.error('이미 승인 혹은 거절된 돈길이에요.');
};

export const handle400_40013 = () => {
  toast.error('자녀 정보가 유효하지 않아요.');
};

export const handle400_40017 = () => {
  toast.error('유저 정보가 유효하지 않아요.');
};

export const handle400_50001 = () => {
  toast.error('돈길이 유효하지 않아요.');
};

export const handle400_50002 = () => {
  toast.error('돈길이 유효하지 않아요.');
};

export const handle400_50003 = () => {
  toast.error('이번주에 이미 돈길 걷기를 완료했어요.');
};

export const handle400_60001 = () => {
  toast.error('URI 생성 과정에서 오류가 발생어요.');
};

export const handle400_60002 = () => {
  toast.error('URI 생성 과정에서 NPE가 발생했어요.');
};

export const handle400_80001 = () => {
  toast.error(
    '유효하지 않은 접근이에요. Client Navigation 설정이 유효하지 않아요.',
    {
      onClose: logoutClient,
    },
  );
};

export const handle400_80002 = () => {
  toast.error('로그인에 실패했어요. 다시 시도해주세요.', {
    onClose: logoutClient,
  });
};

export const handle400_80003 = () => {
  toast.error('Apple OAuth Public Key 조회에 실패했어요. 다시 시도해주세요.', {
    onClose: logoutClient,
  });
};

export const handle400_80004 = () => {
  toast.error('Apple OAuth Nonce 값이 일치하지 않아요. 다시 시도해주세요.', {
    onClose: logoutClient,
  });
};

export const handle400_80005 = () => {
  toast.error('로그인에 실패했어요. 다시 시도해주세요.', {
    onClose: logoutClient,
  });
};
