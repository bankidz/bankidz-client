import styled from 'styled-components';
import TabBar from './TabBar';

interface BackgroundTemplateProps {
  children: JSX.Element;
}

// 화면 하단에 'TapBar'를 함께 랜더링 하는 activity stack의 하위 UI template
function BackgroundTemplate({ children }: BackgroundTemplateProps) {
  return (
    <Wrapper>
      <TabBar />
      <Screen>{children}</Screen>
    </Wrapper>
  );
}

export default BackgroundTemplate;

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
`;

const Screen = styled.div`
  z-index: 0;
`;
