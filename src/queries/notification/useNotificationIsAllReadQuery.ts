import { IFamilyDTO, IKidListDTO } from '@queries/family/api/familyDTO';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import notificationAPI from './api/notificationAPI';

const useNotificationIsAllReadQuery = (
  options?: UseQueryOptions<boolean, AxiosError, boolean, string>,
) => {
  return useQuery(
    queryKeys.NOTIFICATION_IS_READ,
    notificationAPI.getNotificationIsAllRead,
    options,
  );
};
export default useNotificationIsAllReadQuery;
