import { IOptInDTO } from '@lib/apis/user/user.dto';
import userApi from '@lib/apis/user/userApi';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const useUserNoticeMutation = (
  options?: UseMutationOptions<IOptInDTO, AxiosError, any, void>,
) => {
  return useMutation(userApi.patchNoticeAlert, options);
};

export default useUserNoticeMutation;
