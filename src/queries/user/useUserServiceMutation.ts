import { IOptInDTO } from '@lib/apis/user/user.dto';
import userApi from '@lib/apis/user/userApi';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const useUserServiceMutation = (
  options?: UseMutationOptions<IOptInDTO, AxiosError, any, void>,
) => {
  return useMutation(userApi.patchServiceAlert, options);
};

export default useUserServiceMutation;
