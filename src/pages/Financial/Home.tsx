import MarginTemplate from '@components/layout/MarginTemplate';
import styled from 'styled-components';
import { ReactComponent as Banki } from '@assets/illusts/banki/banki_sad.svg';
import OutlinedButton from '@components/common/buttons/OutlinedButton';
import { useNavigate } from 'react-router-dom';

function Home() {
  const family = true; //임시. TODO: kidsSlice 관련 이야기해보기
  const navigate = useNavigate();
  const onButtonClick = () => {
    if (family) {
      navigate('/create/1');
    } else {
      //임시
      navigate('/mypage');
    }
  };
  return (
    <Wrapper>
      <MarginTemplate>
        <h1>금융컨텐츠</h1>
        <Container>
          <Banki />
          <div>
            <div>
              <p style={{ marginBottom: '10px' }}>준비중이에요</p>
              <p>조금만 기다려주세요</p>
            </div>
          </div>
        </Container>
      </MarginTemplate>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  height: calc(var(--vh, 1vh) * 100);
  h1 {
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-top: 16px;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% - 32px);
  transform: translate3d(-50%, -50%, 0);
  display: grid;
  grid-template-rows: 185px auto;
  & > *:not(:first-child) {
    margin: 0 auto;

    margin-top: 16px;
  }

  svg {
    padding-top: 38.93px;
    padding-bottom: 23.84px;
  }
  div {
    p {
      text-align: center;
      ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M}
      color: ${({ theme }) => theme.palette.greyScale.grey600};
    }
  }
`;
