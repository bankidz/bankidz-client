import styled from 'styled-components';
import TopAppBar from '../common/TopAppBar';

interface StackedProps {
  children: JSX.Element;
  label: string;
}

function Stacked({ children, label }: StackedProps) {
  return (
    <>
      <TopAppBar label={label} />
      <Screen>{children}</Screen>
    </>
  );
}

export default Stacked;

const Screen = styled.div``;
