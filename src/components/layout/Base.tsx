import styled from 'styled-components';
import TabBar from './TabBar';

interface BaseProps {
  children: JSX.Element;
}

function Base({ children }: BaseProps) {
  return (
    <>
      <TabBar />
      <Screen>{children}</Screen>
    </>
  );
}

export default Base;

const Screen = styled.div``;
