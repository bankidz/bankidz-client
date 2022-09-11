import styled from 'styled-components';
import { ReactComponent as Banki } from '@assets/icons/giveUpExceeded.svg';
import { ReactComponent as Warning } from '@assets/icons/warning.svg';
import { ReactComponent as Complete } from '@assets/icons/complete.svg';
import Button from '@components/common/buttons/Button';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

interface NoticeProps {
  type:
    | 'giveUpExceeded'
    | 'sunday'
    | 'expired'
    | 'withdrawed'
    | 'createExceeded';
  onMainActionClick?: () => void;
}

const content = {
  giveUpExceeded: {
    icon: <Banki />,
    main: '포기 횟수 초과',
    sub: '돈길 포기는 2주에 1개만 가능해요',
  },
  createExceeded: {
    icon: <Banki />,
    main: '돈길 개수 초과',
    sub: '돈길은 최대 5개까지 걸을 수 있어요',
  },
  sunday: {
    icon: <Banki />,
    main: '오늘은 뱅키즈 쉬는 날',
    sub: (
      <>
        <p>매주 일요일에는 돈길 계약과 수락이 불가해요</p>
        <p>다만, 돈길 걷기는 할 수 있어요!</p>
      </>
    ),
  },
  expired: {
    icon: <Warning />,
    main: '링크가 만료되었어요',
    sub: '가족에게 그룹링크를 다시 요청해주세요',
  },
  withdrawed: {
    icon: <Complete />,
    main: '탈퇴되었습니다',
    sub: '지금까지 뱅키즈를 이용해주셔서 감사합니다',
  },
};
function Notice({ type, onMainActionClick }: NoticeProps) {
  const { setCloseBottomSheet } = useGlobalBottomSheet();
  return (
    <Wrapper>
      <Container type={type}>
        {content[type].icon}
        <p>{content[type].main}</p>
        <div className="sub">{content[type].sub}</div>
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

const Container = styled.div<{
  type:
    | 'giveUpExceeded'
    | 'sunday'
    | 'expired'
    | 'withdrawed'
    | 'createExceeded';
}>`
  svg {
    width: 48px;
    height: 48px;
  }
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
  .sub {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-right: auto;
    & > p:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;
