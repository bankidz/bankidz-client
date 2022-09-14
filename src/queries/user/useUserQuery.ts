import { IMyPageDTO } from '@lib/apis/user/user.dto';
import userApi from '@lib/apis/user/userApi';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useUserQuery = (
  options?: UseQueryOptions<IMyPageDTO, AxiosError, IMyPageDTO, string>,
) => {
  return useQuery(queryKeys.USER, userApi.getUser, options);
};
export default useUserQuery;
