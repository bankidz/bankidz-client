import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { INotificationDTO } from './notification.dto';
const useNotificationApi = () => {
  const axiosPrivate = useAxiosPrivate();

  // 알림 내역 가져오기 (무한스크롤)
  const getNotification = async ({
    pageParam = '',
  }): Promise<INotificationDTO> => {
    const response = await axiosPrivate.get(
      `/notification?lastId=${pageParam}`,
    );
    const data = response.data.data;
    return data;
  };

  // 알림 읽은 처리
  const patchNotificationIsRead = async (id: number) => {
    const response = await axiosPrivate.patch(`/notification/${id}`);
    const data = response.data.data;
    return data;
  };

  // 새 알림 여부
  const getNotificationIsAllRead = async (): Promise<boolean> => {
    const response = await axiosPrivate.get(`/notification/isRead`);
    const data = response.data.data;
    return data.isAllRead;
  };

  return { getNotification, patchNotificationIsRead, getNotificationIsAllRead };
};

export default useNotificationApi;
