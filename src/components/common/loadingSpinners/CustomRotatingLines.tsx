import { RotatingLines } from 'react-loader-spinner';
import styled from 'styled-components';

interface CustomRotatingLinesProps {
  width?: string;
}

/**
 * @param width 필요 시 크기를 지정합니다. 기본값은 28입니다.
 */
function CustomRotatingLines({ width = '28' }: CustomRotatingLinesProps) {
  return (
    <Wrapper>
      <RotatingLines
        strokeColor="#525354" // grey700
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
    </Wrapper>
  );
}

export default CustomRotatingLines;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
