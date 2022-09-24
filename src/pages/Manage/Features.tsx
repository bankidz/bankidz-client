import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import features from '@assets/images/features.png';
import styled from 'styled-components';

function Features() {
  return (
    <ForegroundTemplate label="서비스 소개">
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
