import styled from 'styled-components';
import { ReactComponent as Delete } from '@assets/icons/delete.svg';
import Button from '@components/common/buttons/Button';

interface DeleteCheckProps {
  onClickDelete: () => void;
  onDismiss: () => void;
}

function DeleteCheck({ onClickDelete, onDismiss }: DeleteCheckProps) {
  return (
    <Wrapper>
      <Container>
        <Delete />
        <p>정말로 삭제할거예요?</p>
      </Container>
      <ButtonContainer>
        <Button label="취소" property="sub" onClick={onDismiss} />
        <Button label="삭제하기" property="delete" onClick={onClickDelete} />
      </ButtonContainer>
    </Wrapper>
  );
}

export default DeleteCheck;

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
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 8px;
`;
