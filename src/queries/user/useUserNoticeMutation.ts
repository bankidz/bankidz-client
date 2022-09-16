import { IOptInDTO } from '@queries/user/api/userDTO';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import userAPI from './api/userAPI';

const useUserNoticeMutation = (
  options?: UseMutationOptions<IOptInDTO, AxiosError, any, void>,
) => {
  return useMutation(userAPI.patchNoticeAlert, options);
};

export default useUserNoticeMutation;
