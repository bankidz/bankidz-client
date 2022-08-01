import styled from 'styled-components';

function LargeSpacer() {
  return <StyledDiv />;
}

export default LargeSpacer;

// TabBar height: 47px;
// TabBar 있는 경우 LargeSpacer(height: 96), TabBar 없는 경우 SmallSpacer(height: 48) 사용
const StyledDiv = styled.div`
  height: 96px;
  width: 100%;
  background: palegreen;
`;
