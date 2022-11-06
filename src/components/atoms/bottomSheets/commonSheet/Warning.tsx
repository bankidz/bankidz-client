import styled from 'styled-components';
import { ReactComponent as Delete } from '@assets/icons/delete.svg';
import { ReactComponent as Leave } from '@assets/icons/leaveGroup.svg';
import Button from '@components/atoms/buttons/Button';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

interface WarningProps {
  type: 'delete' | 'leaveGroup' | 'leaveGroupCheck';
  onMainActionClick: () => void;
  onDismiss?: () => void;
}

const content = {
  delete: {
    icon: <Delete />,
    main: '정말로 삭제할거예요?',
    sub: null,
    label: '삭제하기',
  },
  leaveGroup: {
    icon: <Leave />,
    main: '기존 가족그룹을 나갈까요?',
    sub: '가족그룹이 있어야 돈길을 생성할 수 있어요.',
    label: '나가기',
  },
  leaveGroupCheck: {
    icon: <Leave />,
    main: '정말로 가족그룹을 나갈건가요?',
    sub: '이전 진행한 돈길은 모두 삭제됩니다.',
    label: '나가기',
  },
};

function Warning({ type, onMainActionClick, onDismiss }: WarningProps) {
  const { setCloseBottomSheet } = useGlobalBottomSheet();
  return (
    <Wrapper>
      <Container>
        {content[type].icon}
        <div className="main">{content[type].main}</div>
        <div className="sub">{content[type].sub}</div>
      </Container>
      <ButtonContainer>
        <Button
          label="취소"
          property="sub"
          onClick={onDismiss ? onDismiss : setCloseBottomSheet}
        />
        <Button
          label={content[type].label}
          property="delete"
          onClick={onMainActionClick}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default Warning;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 25px 16px 32px 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > .sub {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-right: auto;
  }

  & > .main {
    ${({ theme }) => theme.typo.bottomSheet.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 8px;
`;
