import { IMyPageDTO } from '@queries/user/api/userDTO';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import userAPI from './api/userAPI';

const useUserQuery = (
  options?: UseQueryOptions<IMyPageDTO, AxiosError, IMyPageDTO, string>,
) => {
  return useQuery(queryKeys.USER, userAPI.getUser, options);
};
export default useUserQuery;
