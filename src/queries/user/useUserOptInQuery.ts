import { IOptInDTO } from '@lib/apis/user/user.dto';
import userApi from '@lib/apis/user/userApi';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useUserOptInQuery = (
  options?: UseQueryOptions<IOptInDTO, AxiosError, IOptInDTO, string>,
) => {
  return useQuery(queryKeys.USER_OPTIN, userApi.getUserOptIn, options);
};
export default useUserOptInQuery;
