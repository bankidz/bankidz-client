import styled from 'styled-components';
import { INotification } from '@lib/apis/notification/notificationDTO';
import { ReactComponent as AlertDongil } from '@assets/icons/alertDongil.svg';
import { ReactComponent as AlertNotice } from '@assets/icons/alertNotice.svg';
import { ReactComponent as AlertLevel } from '@assets/icons/alertLevel.svg';
import { ReactComponent as AlertFamily } from '@assets/icons/alertFamily.svg';
import getTimeForToday from '@lib/utils/getTimeForToday';

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

export interface NotificationItemProps {
  notification: INotification;
  isRead: boolean;
  handleListItemClick: () => void;
}

const NotificationItem = ({
  notification,
  isRead,
  handleListItemClick,
}: NotificationItemProps) => {
  const { id, notificationCategory, createdAt, title, message } = notification;
  return (
    <Wrapper key={id} isRead={isRead} onClick={handleListItemClick}>
      {icon[notificationCategory]}
      <div>
        <div className="sub">
          <p>{category[notificationCategory]}</p>
          <p>{getTimeForToday(createdAt)}</p>
        </div>
        <div className="main">
          <p>{title}</p>
          <p>{message}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default NotificationItem;

const Wrapper = styled.div<{ isRead: boolean }>`
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
