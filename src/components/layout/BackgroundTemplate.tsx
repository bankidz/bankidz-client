import styled from 'styled-components';
import TabBar from './TabBar';

interface BackgroundTemplateProps {
  children: JSX.Element;
}

function BackgroundTemplate({ children }: BackgroundTemplateProps) {
  return (
    <>
      <TabBar />
      <Screen>{children}</Screen>
    </>
  );
}

export default BackgroundTemplate;

const Screen = styled.div``;
