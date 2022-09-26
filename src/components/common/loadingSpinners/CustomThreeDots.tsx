import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

interface CustomThreeDotsProps {
  variant?: 'grey' | 'yellow';
}

/**
 * @param variant 'grey'와 'yellow'중 컴포넌트의 색상을 선택합니다.
 * 기본값은 'grey'입니다.
 */
function CustomThreeDots({ variant = 'grey' }: CustomThreeDotsProps) {
  return (
    <Wrapper>
      <ThreeDots
        height={60}
        width={60}
        radius={8}
        color={variant === 'grey' ? '#525354' : '#FFC52F'} // grey700, yellow400
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
