import styled from 'styled-components';
import { ReactComponent as Complete } from '@assets/icons/complete.svg';
import Button from '@components/common/buttons/Button';

interface SheetCompleteProps {
  type: 'delete' | 'cancel' | 'giveUp';
  title?: string;
  onDismiss: () => void;
}

function SheetComplete({ type, title, onDismiss }: SheetCompleteProps) {
  return (
    <Wrapper>
      <Container>
        <Complete />
        {type === 'delete' && <p>삭제되었어요!</p>}
        {type === 'cancel' && <p>'포기하기'가 취소되었어요</p>}
        {type === 'giveUp' && (
          <p>
            <div>'{title}' 돈길이</div>
            <div style={{ marginTop: '10px' }}>포기되었어요</div>
          </p>
        )}
      </Container>
      <Button label="확인" property="default" onClick={onDismiss} />
    </Wrapper>
  );
}

export default SheetComplete;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 25px 16px 32px 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & > p {
    ${({ theme }) => theme.typo.bottomSheet.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    text-align: center;
  }
`;
