import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { ReactComponent as Banki } from '@assets/icons/giveUpExceeded.svg';
import styled from 'styled-components';
import useInfiniteNotificationQuery from '@lib/hooks/queries/useInfiniteNotificationQuery';
import NotificationList from '@components/home/NotificationList';
import LoadingSpinner from '@components/common/loaders/LoadingSpinner';

const Notification = () => {
  const { data, status, Observation } = useInfiniteNotificationQuery();
  return (
    <ForegroundTemplate label="알림 내역" to="/">
      {status === 'success' ? (
        <>
          {data?.pages[0].notificationList.length === 0 ? (
            <Content>
              <Banki />
              <p>등록된 알림이 없어요</p>
            </Content>
          ) : (
            <>
              {data?.pages.map((notifications) => (
                <NotificationList
                  notifications={notifications.notificationList}
                  key={notifications.lastId}
                />
              ))}
            </>
          )}

          <Observation />
        </>
      ) : (
        <>
          <Wrapper>
            <LoadingSpinner />
          </Wrapper>
        </>
      )}
    </ForegroundTemplate>
  );
};

export default Notification;

const Content = styled.div`
  height: 224px;
  width: 224px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  margin: auto;
  margin-top: 160px;

  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 80px;
    height: 80px;
    margin-top: 52px;
  }
  p {
    ${({ theme }) => theme.typo.text.T_14_EB}
    font-weight: 400;
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-top: 17px;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
`;
