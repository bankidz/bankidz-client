import styled from 'styled-components';
import parentMain from '@assets/images/guides/parent-main.png';

const ParentMain = () => {
  return (
    <Wrapper>
      <img src={parentMain} />
      <Text>
        <p>
          <span>자녀의 올바른 금융습관</span>을 위해
        </p>
        <p>
          <span>재밌는 저축경험</span>을 함께해요
        </p>
      </Text>
    </Wrapper>
  );
};

export default ParentMain;

const Wrapper = styled.div`
  img {
    width: 100%;
    box-sizing: border-box;
    padding: 0 8px;
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
