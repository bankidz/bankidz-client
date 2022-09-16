import kakaoAPI from '@lib/apis/kakao/kakaoAPI';
import { useMutation } from 'react-query';

function useKakaoLoginMutation({ ...options }) {
  return useMutation(kakaoAPI.login, options);
}

export default useKakaoLoginMutation;
