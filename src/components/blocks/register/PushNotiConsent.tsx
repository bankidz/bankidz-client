import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ReactComponent as AppICon } from '@assets/icons/app-icon-6.svg';
import Button from '@components/atoms/buttons/Button';
import userAPI from '@lib/apis/user/userAPI';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

interface PushNotiBlockProps {
  children: React.ReactNode;
}

function PushNotiBlockTemplate({ children }: PushNotiBlockProps) {
  return (
    <PushNotiBlock>
      <div className="header-wrapper">
        <div className="left-aligned-wrapper">
          <div className="app-icon-wrapper">
            <AppICon />
          </div>
          <span className="logo">BANKIDZ</span>
        </div>
        <span className="now">지금</span>
      </div>
      {children}
    </PushNotiBlock>
  );
}

const PushNotiBlock = styled.div`
  & + & {
    margin-top: 16px;
  }
  margin-top: 60px;
  width: 100%;
  height: 79px;
  background: ${({ theme }) => theme.palette.greyScale.grey700};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: 26px 23px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .left-aligned-wrapper {
      display: flex;

      .app-icon-wrapper {
        margin-top: -3px;
        width: 14px;
        height: 14px;
      }
      .logo {
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 500;
        font-size: 9px;
        color: ${({ theme }) => theme.palette.greyScale.grey300};
        margin-left: 6px;
      }
    }

    .now {
      ${({ theme }) => theme.typo.text.S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey300};
    }
  }

  .first {
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.white};
    width: 100%;
    height: 10px;
    margin-bottom: 8px;
  }
  .second {
    ${({ theme }) => theme.typo.text.S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey300};
    width: 100%;
    height: 10px;
  }
`;

function PushNotiConsent() {
  const navigate = useNavigate();
  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();

  const openBottomSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      contentProps: {
        type: 'pushNoti',
        onMainActionClick: () => {
          setCloseBottomSheet();
          navigate('/auth/register/4');
        },
      },
    });
  };

  // 가족 활동 알림
  const serviceAlertMutation = useMutation(userAPI.patchServiceAlert, {
    onSuccess: (data) => {
      setLocalStorage('alert', data);
      openBottomSheet();
    },
  });
  // 공지 및 이벤트 알림
  const noticeAlertMutation = useMutation(userAPI.patchNoticeAlert, {
    onSuccess: () => {
      serviceAlertMutation.mutate();
    },
  });

  return (
    <Wrapper>
      <header>
        <h1>끝까지 돈을 모을 수 있도록</h1>
        <h1 className="second">뱅키가 도와드릴게요</h1>
        <sub>이벤트 및 돈길 활동들에 대하여 알림을 보내드려요</sub>
      </header>
      <PushNotiBlockTemplate>
        <p className="first">부모님이 돈길을 수락했어요 🙆‍♀️</p>
        <p className="second">수락한 돈길 빨리 걸으러 가요 🏃‍♂️</p>
      </PushNotiBlockTemplate>
      <PushNotiBlockTemplate>
        <p className="first">레벨업까지 딱 한개만!</p>
        <p className="second">레벨업까지 🔶1개🔶의 돈길만 남았어요!</p>
      </PushNotiBlockTemplate>
      <Instruction>{`푸시 알림은 [마이페이지 > 알림 설정]에서 변경 가능해요!`}</Instruction>
      <DoubleButtonWrapper>
        <Button
          property="sub"
          label="다음에요"
          onClick={() => {
            navigate('/auth/register/4');
          }}
        />
        <Button
          property="default"
          label="알림 받을게요"
          onClick={() => {
            noticeAlertMutation.mutate();
          }}
        />
      </DoubleButtonWrapper>
    </Wrapper>
  );
}

export default PushNotiConsent;

const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
  background: ${({ theme }) => theme.palette.greyScale.white};
  position: relative;
  background: ${({ theme }) => theme.palette.greyScale.grey100};

  header {
    margin-top: 88px;
    h1 {
      ${({ theme }) => theme.typo.text.T_21_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
      line-height: 150%;
    }
    .second {
      margin-bottom: 16px;
    }
    sub {
      ${({ theme }) => theme.typo.text.S_14_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
      height: 37px;
    }
  }
`;

const Instruction = styled.span`
  text-align: center;
  width: 100%;
  height: 18px;
  ${({ theme }) => theme.typo.text.S_12_M};
  color: ${({ theme }) => theme.palette.greyScale.grey600};
  position: absolute;
  bottom: 89px;
`;

const DoubleButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;
  position: absolute;
  bottom: 17px;
`;
