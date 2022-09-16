import { IOptInDTO } from '@queries/user/api/userDTO';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import userAPI from './api/userAPI';

const useUserOptInQuery = (
  options?: UseQueryOptions<IOptInDTO, AxiosError, IOptInDTO, string>,
) => {
  return useQuery(queryKeys.USER_OPTIN, userAPI.getUserOptIn, options);
};
export default useUserOptInQuery;
