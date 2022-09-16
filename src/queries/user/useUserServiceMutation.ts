import { IOptInDTO } from '@queries/user/api/userDTO';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import userAPI from './api/userAPI';

const useUserServiceMutation = (
  options?: UseMutationOptions<IOptInDTO, AxiosError, any, void>,
) => {
  return useMutation(userAPI.patchServiceAlert, options);
};

export default useUserServiceMutation;
