import { IOptInDTO } from '@lib/apis/user/userDTO';
import userAPI from '@lib/apis/user/userAPI';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const useUserServiceMutation = (
  options?: UseMutationOptions<IOptInDTO, AxiosError, any, void>,
) => {
  return useMutation(userAPI.patchServiceAlert, options);
};

export default useUserServiceMutation;
