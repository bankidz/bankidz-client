import styled from 'styled-components';
import Button from '../../Button';
import { ReactComponent as SadBanky } from '../../../../assets/banky/sad.svg';

interface DeleteChallengeProps {
  onClickDelete: () => void;
  onDismiss: () => void;
}

function DeleteChallenge({ onClickDelete, onDismiss }: DeleteChallengeProps) {
  return (
    <Wrapper>
      <Container>
        <p>정말 포기할거예요?</p>
        <BankyWrapper>
          <SadBanky />
        </BankyWrapper>
        <Rule>
          <p>포기규칙</p>
          <p>
            2주에 하나의 돈길만 포기할 수 있어요.
            <br />
            단, 생성 후 일주일 전까지는 상관없이 포기할 수 있어요.
          </p>
        </Rule>
      </Container>
      <ButtonContainer>
        <Button label="포기하기" sub={true} onClick={onClickDelete} />
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
    font-family: 'TmoneyRoundWind';
    font-size: 21px;
    line-height: 21px;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.black};
  }
`;

const BankyWrapper = styled.div`
  height: 292px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rule = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[1]};
  padding: 16px;
  border-radius: 12px;
  & > p:first-child {
    font-family: 'TmoneyRoundWind';
    font-size: 14px;
    line-height: 1.5;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.gray[5]};
  }
  & > p:nth-child(2) {
    font-family: 'TmoneyRoundWind';
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.gray[5]};
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 8px;
`;
