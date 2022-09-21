import { IMyPageDTO } from '@lib/apis/user/userDTO';
import userAPI from '@lib/apis/user/userAPI';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useUserQuery = (
  options?: UseQueryOptions<IMyPageDTO, AxiosError, IMyPageDTO, string>,
) => {
  return useQuery(queryKeys.USER, userAPI.getUser, options);
};
export default useUserQuery;
