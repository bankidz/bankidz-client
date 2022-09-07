import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { INotificationDTO } from './notification.dto';
const useNotificationApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getNotification = async ({
    pageParam = null,
  }): Promise<INotificationDTO> => {
    const response = await axiosPrivate.get(`/notification?last=${pageParam}`);
    const data = response.data.data;
    return data;
  };

  return { getNotification };
};

export default useNotificationApi;
