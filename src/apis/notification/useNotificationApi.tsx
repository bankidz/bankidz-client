import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { INotificationDTO } from './notification.dto';
const useNotificationApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getNotification = async ({
    pageParam = '',
  }): Promise<INotificationDTO> => {
    const response = await axiosPrivate.get(
      `/notification?lastId=${pageParam}`,
    );
    const data = response.data.data;
    return data;
  };

  const patchNotificationIsRead = async (id: number) => {
    const response = await axiosPrivate.patch(`/notification/${id}`);
    const data = response.data.data;
    return data;
  };

  return { getNotification, patchNotificationIsRead };
};

export default useNotificationApi;
