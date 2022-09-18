import { IOptInDTO } from '@lib/apis/user/userDTO';
import userAPI from '@lib/apis/user/userAPI';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const useUserNoticeMutation = (
  options?: UseMutationOptions<IOptInDTO, AxiosError, any, void>,
) => {
  return useMutation(userAPI.patchNoticeAlert, options);
};

export default useUserNoticeMutation;
