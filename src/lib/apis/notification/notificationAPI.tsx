import { axiosPrivate } from '../axios';
import { INotificationDTO } from './notificationDTO';
const notificationAPI = {
  // 알림 내역 가져오기 (무한스크롤)
  getNotification: async ({ pageParam = '' }): Promise<INotificationDTO> => {
    const response = await axiosPrivate.get(
      `/notification?lastId=${pageParam}`,
    );
    const data = response.data;
    return data;
  },

  // 알림 읽은 처리
  patchNotificationIsRead: async (id: number) => {
    const response = await axiosPrivate.patch(`/notification/${id}`);
    const data = response.data;
    return data;
  },

  // 새 알림 여부
  getNotificationIsAllRead: async (): Promise<boolean> => {
    const response = await axiosPrivate.get(`/notification/isRead`);
    const data = response.data;
    return data.isAllRead;
  },
};

export default notificationAPI;
