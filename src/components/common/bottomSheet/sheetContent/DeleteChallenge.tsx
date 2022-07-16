import styled from 'styled-components';
import { ReactComponent as Banki } from '@assets/illust/banki/banki_giveup.svg';
import Button from '@components/common/button/Button';

interface DeleteChallengeProps {
  onClickDelete: () => void;
  onDismiss: () => void;
}

function DeleteChallenge({ onClickDelete, onDismiss }: DeleteChallengeProps) {
  return (
    <Wrapper>
      <Container>
        <p>정말 포기할거예요?</p>
        <BankiWrapper>
          <Banki />
        </BankiWrapper>
        <Rule>
          <p>포기규칙</p>
          <p>
            2주에 하나의 돈길만 포기할 수 있어요.
            <br />
            포기하면 돌이킬 수 없어요.
          </p>
        </Rule>
      </Container>
      <ButtonContainer>
        <Button label="포기하기" property="sub" onClick={onClickDelete} />
        <Button label="다시 도전해볼게요" onClick={onDismiss} />
      </ButtonContainer>
    </Wrapper>
  );
}

export default DeleteChallenge;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 29px 16px 36px 16px;
  display: grid;
  grid-template-rows: auto;
  grid-gap: 16px;

  & > p:first-child {
    ${({ theme }) => theme.typo.popup.Title_T_21_EB}
    color: black;
  }
`;

const BankiWrapper = styled.div`
  height: 185px;
  padding: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rule = styled.div`
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.medium};
  & > p:first-child {
    ${({ theme }) => theme.typo.bottomSheet.T_14_EB}
    line-height: 160%;
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
  & > p:nth-child(2) {
    ${({ theme }) => theme.typo.bottomSheet.S_12_R}
    line-height: 160%;
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 8px;
`;
