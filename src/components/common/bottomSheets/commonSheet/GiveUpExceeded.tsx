import styled from 'styled-components';
import { ReactComponent as Exceeded } from '@assets/icons/giveUpExceeded.svg';
import Button from '@components/common/buttons/Button';

interface GiveUpExceededProps {
  onDismiss: () => void;
}

function GiveUpExceeded({ onDismiss }: GiveUpExceededProps) {
  return (
    <Wrapper>
      <Container>
        <Exceeded />
        <p>포기 횟수 초과</p>
        <p>돈길 포기는 2주에 1개만 가능해요</p>
      </Container>
      <Button label="확인" property="default" onClick={onDismiss} />
    </Wrapper>
  );
}

export default GiveUpExceeded;

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
    color: ${({ theme }) => theme.palette.sementic.red300};
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    margin-right: auto;
  }
`;
