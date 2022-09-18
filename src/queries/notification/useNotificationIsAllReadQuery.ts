import { IFamilyDTO, IKidListDTO } from '@lib/apis/family/familyDTO';
import familyAPI from '@lib/apis/family/familyAPI';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import notificationAPI from '@lib/apis/notification/notificationAPI';

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
