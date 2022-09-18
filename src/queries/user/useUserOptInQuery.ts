import { IOptInDTO } from '@lib/apis/user/userDTO';
import userAPI from '@lib/apis/user/userAPI';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useUserOptInQuery = (
  options?: UseQueryOptions<IOptInDTO, AxiosError, IOptInDTO, string>,
) => {
  return useQuery(queryKeys.USER_OPTIN, userAPI.getUserOptIn, options);
};
export default useUserOptInQuery;
