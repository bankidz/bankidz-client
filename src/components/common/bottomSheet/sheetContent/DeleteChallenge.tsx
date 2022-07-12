import styled from 'styled-components';
import { ReactComponent as SvgSadBanki } from '@assets/illust/banki-sad.svg';
import Button from '@components/common/Button/Button';

interface DeleteChallengeProps {
  /*   onClickDelete: () => void;
  onDismiss: () => void; */
}

function DeleteChallenge({}: DeleteChallengeProps) {
  return (
    <Wrapper>
      <Container>
        <p>정말 포기할거예요?</p>
        <BankyWrapper>
          <SvgSadBanki />
        </BankyWrapper>
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
        <Button label="포기하기" sub={true} />
        <Button label="다시 도전해볼게요" />
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

const BankyWrapper = styled.div`
  height: 292px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rule = styled.div`
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.medium};
  & > p:first-child {
    font-family: 'TmoneyRoundWind';
    font-size: 14px;
    line-height: 1.5;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  & > p:nth-child(2) {
    font-family: 'TmoneyRoundWind';
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 8px;
`;
