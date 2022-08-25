import styled from 'styled-components';
import TabBar from './TabBar';

// TODO: 일관성 가져죠요
interface BackgroundTemplateProps {
  children: JSX.Element;
}

// 화면 하단에 'TapBar'를 함께 랜더링 하는 activity stack의 하위 UI template
function BackgroundTemplate({ children }: BackgroundTemplateProps) {
  return (
    <>
      <TabBar />
      <Screen>{children}</Screen>
    </>
  );
}

export default BackgroundTemplate;

const Screen = styled.div`
  z-index: 0;
`;
