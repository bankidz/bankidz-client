import { INotification } from '@lib/apis/notification/notification.dto';
import { ReactComponent as AlertDongil } from '@assets/icons/alertDongil.svg';
import { ReactComponent as AlertNotice } from '@assets/icons/alertNotice.svg';
import { ReactComponent as AlertLevel } from '@assets/icons/alertLevel.svg';
import { ReactComponent as AlertFamily } from '@assets/icons/alertFamily.svg';
import styled, { css } from 'styled-components';
import getTimeForToday from '@lib/utils/getTimeForToday';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationApi from '@lib/apis/notification/notificationApi';

const NotificationList = ({
  notifications,
}: {
  notifications: INotification[];
}) => {
  const navigate = useNavigate();
  const icon = {
    CHALLENGE: <AlertDongil />,
    NOTICE: <AlertNotice />,
    LEVEL: <AlertLevel />,
    FAMILY: <AlertFamily />,
  };
  const category = {
    CHALLENGE: '돈길',
    NOTICE: '공지',
    LEVEL: '레벨',
    FAMILY: '가족',
  };

  const onNotificationItemClick = useCallback(
    async (id: number, isRead: boolean, url: string) => {
      if (!isRead) {
        await notificationApi.patchNotificationIsRead(id);
      }
      console.log(url);
      url && navigate(url); //TODO : 임시
    },
    [],
  );

  return (
    <Wrapper>
      {notifications.map((notification) => (
        <Item
          key={notification.id}
          isRead={notification.isRead}
          onClick={() =>
            onNotificationItemClick(
              notification.id,
              notification.isRead,
              notification.linkUrl,
            )
          }
        >
          {icon[notification.notificationCategory]}
          <div>
            <div className="sub">
              <p>{category[notification.notificationCategory]}</p>
              <p>{getTimeForToday(notification.createdAt)}</p>
            </div>
            <div className="main">
              <p>{notification.title}</p>
              <p>{notification.message}</p>
            </div>
          </div>
        </Item>
      ))}
    </Wrapper>
  );
};

export default NotificationList;

const Wrapper = styled.div``;

const Item = styled.div<{ isRead: boolean }>`
  display: grid;
  grid-template-columns: 48px auto;
  grid-gap: 16px;
  padding: 16px 18px 20px 18px;
  background-color: ${({ isRead, theme }) =>
    isRead ? 'none' : theme.palette.main.yellow100};
  cursor: pointer;
  .sub {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    & > p:first-child {
      ${({ theme }) => theme.typo.text.T_12_EB}
      color: ${({ theme }) => theme.palette.greyScale.grey500};
    }
    & > p:last-child {
      ${({ theme }) => theme.typo.text.Alarm_T_12_R}
      color: ${({ theme }) => theme.palette.greyScale.grey500};
    }
  }

  .main {
    ${({ theme }) => theme.typo.text.Alarm_T_14_R}
    line-height: 150%;
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  svg {
    margin: auto 0px;
  }
`;
