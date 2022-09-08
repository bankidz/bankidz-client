export interface INotification {
  createdAt: string;
  id: number;
  isRead: boolean;
  message: string;
  title: string;
  notificationCategory: 'CHALLENGE' | 'NOTICE' | 'LEVEL' | 'FAMILY';
}

export interface INotificationDTO {
  lastId: number;
  isLast: boolean;
  notificationList: INotification[];
}
