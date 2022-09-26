import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

interface CustomThreeDotsProps {
  variant?: 'yellow' | 'grey';
}

/**
 * @param variant 'yellow'와 'grey'중 컴포넌트의 색상을 선택합니다.
 * 기본값은 'yellow'입니다.
 */
function CustomThreeDots({ variant = 'yellow' }: CustomThreeDotsProps) {
  return (
    <Wrapper>
      <ThreeDots
        height={50}
        width={50}
        radius={8}
        color={variant === 'yellow' ? '#FFC52F' : '#525354'} // yellow400, grey700
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
