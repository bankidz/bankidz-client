import logoutClient from '@lib/utils/handleLogout';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  handle400default,
  handle400_10001,
  handle400_10002,
  handle400_20002,
  handle400_20003,
  handle400_20004,
  handle400_30003,
  handle400_30004,
  handle400_30008,
  handle400_30009,
  handle400_30010,
  handle400_40003,
  handle400_40004,
  handle400_40005,
  handle400_40008,
  handle400_40009,
  handle400_40011,
  handle400_40013,
  handle400_40017,
  handle400_50001,
  handle400_50002,
  handle400_50003,
  handle400_60001,
  handle400_60002,
} from './handle400';
import {
  handle403default,
  handle403_30002,
  handle403_30005,
  handle403_30006,
  handle403_30007,
  handle403_40001,
  handle403_40002,
  handle403_40007,
  handle403_40012,
  handle403_40014,
} from './handle403';

/** common handler */
const handleCommon = (serviceCode: string | undefined) => {
  console.error('serviceCode: ', serviceCode);
};

/** default handler */
const handleDefault = () => {
  toast.error('예상치 못한 오류가 발생했습니다. 다시 로그인 해주세요.', {
    onClose: logoutClient,
  });
};
const handle401default = () => {
  toast.error('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.', {
    onClose: logoutClient,
  });
};
const handle500default = () => {
  toast.error('예상치 못한 서버 오류가 발생했습니다.');
};

/**
 * 애러 핸들링 리스트
 * https://bankidz.notion.site/f2858b7e3e984a239c91534c59893c68?v=d884526d4bcf4459940038808e187fce
 */
const defaultHandlers = {
  common: handleCommon,
  default: handleDefault,
  400: {
    default: handle400default,
    'E400-10001': handle400_10001,
    'E400-10002': handle400_10002,
    'E400-20002': handle400_20002,
    'E400-20003': handle400_20003,
    'E400-20004': handle400_20004,
    'E400-30003': handle400_30003,
    'E400-30004': handle400_30004,
    'E400-30008': handle400_30008,
    'E400-30009': handle400_30009,
    'E400-30010': handle400_30010,
    'E400-40003': handle400_40003,
    'E400-40004': handle400_40004,
    'E400-40005': handle400_40005,
    'E400-40008': handle400_40008,
    'E400-40009': handle400_40009,
    'E400-40011': handle400_40011,
    'E400-40013': handle400_40013,
    'E400-40017': handle400_40017,
    'E400-50001': handle400_50001,
    'E400-50002': handle400_50002,
    'E400-50003': handle400_50003,
    'E400-60001': handle400_60001,
    'E400-60002': handle400_60002,
  },
  401: {
    default: handle401default,
  },
  403: {
    default: handle403default,
    'E403-30002': handle403_30002,
    'E403-30005': handle403_30005,
    'E403-30006': handle403_30006,
    'E403-30007': handle403_30007,
    'E403-40001': handle403_40001,
    'E403-40002': handle403_40002,
    'E403-40007': handle403_40007,
    'E403-40012': handle403_40012,
    'E403-40014': handle403_40014,
  },
  500: {
    default: handle500default,
  },
};

/**
 * @param handlers 컴포넌트에서 재정의한 핸들러 모음
 * @returns handleError: (error: any) => void
 *
 * 에러 발생 시 실행할 가능성이 있는 핸들러는 5가지가 있습니다.
 * 다음 나열 순서는 실행 우선순위와 동일합니다.
 * 1. 컴포넌트에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 재정의한 핸들러
 * 2. 컴포넌트에서 (HTTP Status) Key로 재정의한 핸들러
 * 3. Hook에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 정의한 핸들러
 * 4. Hook에서 (HTTP Status) Key로 정의한 핸들러
 * 5. 어디에서도 정의되지 못한 에러를 처리하는 핸들러
 */
function useAPIError(handlers: any = undefined) {
  // 우선순위에 따른 핸들러의 선택과 실행
  const handleError = useCallback(
    (error: any) => {
      const httpStatus = error?.response?.status; // HTTP Status
      const serviceCode = error?.response?.data?.error; // 서비스 표준 애러 코드

      // 우선순위 1. 컴포넌트에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 재정의한 핸들러
      if (handlers && handlers[httpStatus][serviceCode]) {
        handlers[httpStatus][serviceCode]();
      }

      // 우선순위 2. 컴포넌트에서 (HTTP Status) Key로 재정의한 핸들러
      else if (
        handlers &&
        handlers[httpStatus] &&
        handlers[httpStatus]?.default
      ) {
        handlers[httpStatus].default();
      }

      // 우선순위 3. Hook에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 정의한 핸들러
      // @ts-expect-error
      else if (defaultHandlers[httpStatus][serviceCode]) {
        // @ts-expect-error
        defaultHandlers[httpStatus][serviceCode]();
      }

      // 우선순위 4. Hook에서 (HTTP Status) Key로 정의한 핸들러
      // @ts-expect-error
      else if (defaultHandlers[httpStatus]) {
        // @ts-expect-error
        defaultHandlers[httpStatus].default();
      }

      // 우선순위 5. 어디에서도 정의되지 못한 에러를 처리하는 핸들러
      else {
        defaultHandlers.default();
      }

      // 공통 처리 로직 수행
      defaultHandlers.common(serviceCode);
    },
    [handlers],
  );

  return { handleError };
}

export default useAPIError;
