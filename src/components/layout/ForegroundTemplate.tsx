import styled from 'styled-components';
import TopAppBar from './TopAppBar';

interface ForegroundTemplateProps {
  children: JSX.Element;
  label: string;
}

function ForegroundTemplate({ children, label }: ForegroundTemplateProps) {
  return (
    <>
      <TopAppBar label={label} />
      <Screen>{children}</Screen>
    </>
  );
}

export default ForegroundTemplate;

const Screen = styled.div``;
