import styled from 'styled-components';
import ForegroundTemplate from '@components/shared/layout/ForegroundTemplate';
import features from '@assets/images/features.png';

function Features() {
  return (
    <ForegroundTemplate label="서비스 소개" to="/mypage/manage">
      <Content>
        <img src={features} />
      </Content>
    </ForegroundTemplate>
  );
}
export default Features;

const Content = styled.div`
  img {
    width: 100%;
  }
`;
