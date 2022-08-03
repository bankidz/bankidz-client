import styled from 'styled-components';

function SmallSpacer() {
  return <StyledDiv />;
}

export default SmallSpacer;

// TabBar height: 47px;
// TabBar 있는 경우 LargeSpacer(height: 96), TabBar 없는 경우 SmallSpacer(height: 48) 사용
const StyledDiv = styled.div`
  height: 48px;
  width: 100%;
  background: ${({ theme }) => theme.palette.greyScale.grey100};
`;
