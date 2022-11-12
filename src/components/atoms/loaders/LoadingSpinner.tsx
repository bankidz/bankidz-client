import { RotatingLines } from 'react-loader-spinner';
import styled from 'styled-components';
import { theme } from '@lib/styles/theme';

interface CustomRotatingLinesProps {
  width?: string;
  isCenter?: boolean;
}

/**
 * @param width 필요 시 크기를 지정합니다. 기본값은 22입니다.
 * @param isCenter 페이지의 정중앙에 위치시키는 경우 지정합니다.
 */
function LoadingSpinner({
  width = '22',
  isCenter = false,
}: CustomRotatingLinesProps) {
  const content = (
    <Wrapper>
      <RotatingLines
        strokeColor={theme.palette.greyScale.grey600}
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
    </Wrapper>
  );

  if (isCenter) {
    return <LoadingSpinnerWrapper>{content}</LoadingSpinnerWrapper>;
  } else {
    return <>{content}</>;
  }
}

export default LoadingSpinner;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinnerWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
