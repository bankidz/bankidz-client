import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import { theme } from '@lib/styles/theme';

/**
 * 홈 페이지 당겨서 새고침 시 사용합니다.
 */
function CustomThreeDots() {
  return (
    <Wrapper>
      <ThreeDots
        height={50}
        width={50}
        radius={8}
        color={theme.palette.greyScale.grey600}
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
