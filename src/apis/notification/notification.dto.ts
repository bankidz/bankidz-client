export interface INotification {
  createdAt: string;
  id: number;
  isRead: boolean;
  message: string;
  title: string;
}

export interface INotificationDTO {
  lastId: number;
  isLast: boolean;
  notificationList: INotification[];
}
