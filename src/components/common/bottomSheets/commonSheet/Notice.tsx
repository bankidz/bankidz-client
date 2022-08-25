import styled from 'styled-components';
import { ReactComponent as Banki } from '@assets/icons/giveUpExceeded.svg';
import { ReactComponent as Warning } from '@assets/icons/warning.svg';
import Button from '@components/common/buttons/Button';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

interface NoticeProps {
  type: 'giveUpExceeded' | 'sunday' | 'expired';
  onMainActionClick?: () => void;
}

const renderContent = {
  giveUpExceeded: {
    icon: <Banki />,
    main: '포기 횟수 초과',
    sub: '돈길 포기는 2주에 1개만 가능해요',
  },
  sunday: {
    icon: <Banki />,
    main: '오늘은 뱅키즈 쉬는 날',
    sub: '매주 일요일에는 돈길 수락 및 거절이 불가해요.',
  },
  expired: {
    icon: <Warning />,
    main: '링크가 만료되었어요',
    sub: '가족에게 그룹링크를 다시 요청해주세요',
  },
};
function Notice({ type, onMainActionClick }: NoticeProps) {
  const { setCloseBottomSheet } = useGlobalBottomSheet();
  return (
    <Wrapper>
      <Container type={type}>
        {renderContent[type].icon}
        <p>{renderContent[type].main}</p>
        <p>{renderContent[type].sub}</p>
      </Container>
      <Button
        label="확인"
        property="default"
        onClick={onMainActionClick ? onMainActionClick : setCloseBottomSheet}
      />
    </Wrapper>
  );
}

export default Notice;

const Wrapper = styled.div``;

const Container = styled.div<{ type: 'giveUpExceeded' | 'sunday' | 'expired' }>`
  margin: 25px 16px 32px 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & > p {
    ${({ theme }) => theme.typo.bottomSheet.T_21_EB}
    color: ${({ theme, type }) =>
      type === 'giveUpExceeded'
        ? theme.palette.sementic.red300
        : theme.palette.greyScale.black};
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-right: auto;
  }
`;
