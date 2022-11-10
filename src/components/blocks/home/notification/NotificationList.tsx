import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationItem, { NotificationItemProps } from './NotificationItem';
import { INotification } from '@lib/apis/notification/notificationDTO';
import notificationAPI from '@lib/apis/notification/notificationAPI';

interface NotificationListProps {
  notifications: INotification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <>
      {notifications.map((notification) => (
        <NotificationListHeadless
          notification={notification}
          key={notification.id}
        >
          {({ notification, handleListItemClick, isRead }) => (
            <NotificationItem
              notification={notification}
              handleListItemClick={handleListItemClick}
              isRead={isRead}
            />
          )}
        </NotificationListHeadless>
      ))}
    </>
  );
};

export default NotificationList;

interface NotificationListHeadlessProps {
  notification: INotification;
  children: (args: NotificationItemProps) => JSX.Element;
}

const NotificationListHeadless = ({
  notification,
  children,
}: NotificationListHeadlessProps) => {
  const { isRead, id, linkUrl } = notification;
  const [isReadClient, setIsReadClient] = useState<boolean>(isRead);
  const navigate = useNavigate();

  const onNotificationItemClick = useCallback(
    async (id: number, url: string) => {
      if (!isReadClient) {
        await notificationAPI.patchNotificationIsRead(id);
        setIsReadClient(true);
      }
      url && navigate(url);
    },
    [isReadClient],
  );

  return children({
    notification: notification,
    handleListItemClick: () => onNotificationItemClick(id, linkUrl),
    isRead: isReadClient,
  });
};
