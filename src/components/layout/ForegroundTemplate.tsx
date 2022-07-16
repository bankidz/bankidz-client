import styled from 'styled-components';
import AppBar from './AppBar';

interface ForegroundTemplateProps {
  children: JSX.Element;
  label: string;
}

// 'TopBar'를 함께 랜더링 하는 activity stack의 상위 UI template
function ForegroundTemplate({ children, label }: ForegroundTemplateProps) {
  return (
    <>
      <AppBar label={label} />
      <Screen>{children}</Screen>
    </>
  );
}

export default ForegroundTemplate;

const Screen = styled.div``;
