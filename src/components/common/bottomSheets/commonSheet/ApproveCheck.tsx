import styled from 'styled-components';
import { ReactComponent as Check } from '@assets/icons/approveCheck.svg';
import Button from '@components/common/buttons/Button';

interface ApproveCheckProps {
  onApproveButtonClick: () => void;
  onDismiss: () => void;
}

function ApproveCheck({ onApproveButtonClick, onDismiss }: ApproveCheckProps) {
  return (
    <Wrapper>
      <Container>
        <Check />
        <p>자녀의 돈길을 수락할까요?</p>
      </Container>
      <ButtonContainer>
        <Button label="취소" property="sub" onClick={onDismiss} />
        <Button
          label="수락하기"
          property="default"
          onClick={onApproveButtonClick}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default ApproveCheck;

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
