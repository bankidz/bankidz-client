import styled from 'styled-components';
import { ReactComponent as Complete } from '@assets/icons/complete.svg';
import { ReactComponent as Feedback } from '@assets/icons/feedback.svg';
import Button from '@components/common/buttons/Button';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

interface SheetCompleteProps {
  type: 'delete' | 'cancel' | 'giveUp' | 'feedback' | 'approve';
  title?: string;
  onDismiss?: () => void;
}

function SheetCompleted({ type, title, onDismiss }: SheetCompleteProps) {
  const { setCloseBottomSheet } = useGlobalBottomSheet();
  return (
    // TODO: fragment
    <Wrapper>
      <Container>
        {type === 'feedback' ? <Feedback /> : <Complete />}
        {type === 'delete' && <p>삭제되었어요!</p>}
        {type === 'cancel' && <p>'포기하기'가 취소되었어요</p>}
        {type === 'giveUp' && (
          <div>
            <p>'{title}' 돈길이</p>
            <p style={{ marginTop: '10px' }}>포기되었어요</p>
          </div>
        )}
        {type === 'feedback' && <p>자녀에게 피드백이 전송되었어요</p>}
        {type === 'approve' && <p>자녀의 돈길이 수락되었어요</p>}
      </Container>
      <Button
        label="확인"
        property="default"
        onClick={onDismiss ? onDismiss : setCloseBottomSheet}
      />
    </Wrapper>
  );
}

export default SheetCompleted;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 25px 16px 32px 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & p {
    ${({ theme }) => theme.typo.bottomSheet.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    text-align: center;
  }
`;
