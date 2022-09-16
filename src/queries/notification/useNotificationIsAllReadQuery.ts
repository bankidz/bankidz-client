import { IFamilyDTO, IKidListDTO } from '@lib/apis/family/family.dto';
import familyApi from '@lib/apis/family/familyApi';
import notificationApi from '@lib/apis/notification/notificationApi';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

const useNotificationIsAllReadQuery = (
  options?: UseQueryOptions<boolean, AxiosError, boolean, string>,
) => {
  return useQuery(
    queryKeys.NOTIFICATION_IS_READ,
    notificationApi.getNotificationIsAllRead,
    options,
  );
};
export default useNotificationIsAllReadQuery;
