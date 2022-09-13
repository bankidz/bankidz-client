import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { ReactComponent as Banki } from '@assets/icons/giveUpExceeded.svg';
import styled from 'styled-components';
import AlertList from '@components/home/AlertList';
import useGetNotifications from '@queries/notification/useGetNotifications';
const Alert = () => {
  const { data, Observation } = useGetNotifications();
  return (
    <ForegroundTemplate label="알림 내역">
      <>
        {data?.pages[0].notificationList.length === 0 ? (
          <Content>
            <Banki />
            <p>등록된 알림이 없어요</p>
          </Content>
        ) : (
          <>
            {data?.pages.map((alertList) => (
              <AlertList
                alertList={alertList.notificationList}
                key={alertList.lastId}
              />
            ))}
          </>
        )}

        <Observation />
      </>
    </ForegroundTemplate>
  );
};

export default Alert;

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
