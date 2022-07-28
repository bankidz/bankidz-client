import styled from 'styled-components';

function Spacer() {
  return <Holder />;
}

export default Spacer;

// TabBar height: 47px;
const Holder = styled.div`
  height: 200px;
  width: 100%;
  background: palegreen;
`;
