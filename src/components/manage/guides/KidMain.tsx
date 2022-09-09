import styled from 'styled-components';
import main1 from '@assets/images/guides/kid-main-1.png';
import main2 from '@assets/images/guides/kid-main-2.png';
const KidMain = () => {
  return (
    <Wrapper>
      <Text>
        <p>
          <span>가지고 싶은 물건</span>이나
        </p>
        <p>
          <span>자신의 목표</span>를 위해
        </p>
      </Text>
      <img src={main1} className="main1" />
      <Text>
        <p>
          <span>돈길을 만들고</span>
        </p>
        <p>
          <span>부모에게 제안</span>하세요!
        </p>
      </Text>
      <img src={main2} className="main2" />
    </Wrapper>
  );
};

export default KidMain;

const Wrapper = styled.div`
  padding-top: 36px;

  .main1 {
    width: 100vw;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .main2 {
    padding-left: 9px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB}
  &>p:not(:last-child) {
    margin-bottom: 10px;
  }
  span {
    position: relative;
    z-index: 0;
  }
  span:after {
    content: '';
    position: absolute;
    left: 0px;
    width: 100%;
    margin-top: 8px;
    z-index: -1;
    border-bottom: 17px solid ${({ theme }) => theme.palette.main.yellow100};
  }
`;
