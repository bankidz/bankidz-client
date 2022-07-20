import styled from 'styled-components';
import AppBar from './AppBar';

interface ForegroundTemplateProps {
  label: string;
  children: JSX.Element;
}

// 화면 상단에 'AppBar'를 함께 랜더링 하는 activity stack의 상위 UI template
function ForegroundTemplate({ label, children }: ForegroundTemplateProps) {
  return (
    <>
      <AppBar label={label} />
      <Screen>{children}</Screen>
    </>
  );
}

export default ForegroundTemplate;

const Screen = styled.div``;
