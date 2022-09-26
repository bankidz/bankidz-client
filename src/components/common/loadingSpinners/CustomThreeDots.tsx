import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

function CustomThreeDots() {
  return (
    <Wrapper>
      <ThreeDots
        height={50}
        width={50}
        radius={8}
        color="#828489" // grey600
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </Wrapper>
  );
}

export default CustomThreeDots;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
