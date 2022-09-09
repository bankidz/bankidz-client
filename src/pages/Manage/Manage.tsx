import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '@assets/icons/arrow-walking.svg';
import styled from 'styled-components';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useLogout from '@lib/hooks/auth/useLogout';
import removeLocalStorage from '@lib/utils/localStorage/removeLocalStorage';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';
import { useEffect } from 'react';

const contents = [
  { title: '공지사항', link: 'notices' },
  { title: '서비스 소개', link: 'features' },
  { title: '서비스 이용 방법', link: 'guides' },
  { title: '알림 설정', link: 'alerts' },
  { title: '개인정보 처리방침', link: 'privacy' },
  { title: '서비스 약관', link: 'terms' },
  { title: '자주 묻는 질문', link: 'faq' },
  { title: '문의하기', link: '' },
  { title: '로그아웃', link: '' },
  { title: '탈퇴하기', link: 'withdraw' },
];

function Manage() {
  const navigate = useNavigate();

  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();
  const logout = useLogout();
  useEffect(() => {
    const KAKAO_JS_KEY = `${process.env.REACT_APP_KAKAO_JS_KEY}`;
    if (!window.Kakao.isInitialized()) {
      // JavaScript key를 인자로 주고 SDK 초기화
      window.Kakao.init(KAKAO_JS_KEY);
      // SDK 초기화 여부를 확인하자.
    }
  }, []);

  const onManageLinkClick = (content: { title: string; link: string }) => {
    if (content.title === '로그아웃') {
      openLogoutCheckBottomSheet();
    } else if (content.title === '문의하기') {
      onChatButtonClick();
    } else navigate(content.link);
  };

  //카카오채널 상담 열기
  const onChatButtonClick = () => {
    window.Kakao.Channel.chat({
      channelPublicId: '_LjxjVxj',
    });
  };

  // 로그아웃 하시겠습니까 바텀시트
  const openLogoutCheckBottomSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: { open: true },
      contentProps: {
        type: 'logout',
        onMainActionClick: async () => {
          await logout();
          setCloseBottomSheet();
          console.log(
            'aT in onMainActionClick: ',
            getLocalStorage('accessToken'),
          );
        },
      },
    });
  };

  return (
    <ForegroundTemplate label={'설정'} to="/mypage">
      <>
        {contents.map((content) => (
          <Item key={content.title} onClick={() => onManageLinkClick(content)}>
            <p>{content.title}</p>
            <Arrow />
          </Item>
        ))}
      </>
    </ForegroundTemplate>
  );
}

export default Manage;

const Item = styled.button`
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 26px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.greyScale.grey200};
  p {
    ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M}
    color: ${({ theme }) => theme.palette.greyScale.grey700};
    margin-top: 4px;
  }
  svg {
    fill: ${({ theme }) => theme.palette.greyScale.grey500};
  }

  &:first-child {
    margin-top: 20px;
  }
`;
