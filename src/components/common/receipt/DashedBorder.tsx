import styled from 'styled-components';
import { ReactComponent as HorizontalDashedBorder } from '@assets/borders/horizontal-dashed-border.svg';
import { theme } from '@lib/styles/theme';

function DashedBorder() {
  return (
    <>
      <FirstHorizontalDashedBorderWrapper>
        <HorizontalDashedBorder fill={theme.palette.greyScale.grey200} />
      </FirstHorizontalDashedBorderWrapper>
      <SecondHorizontalDashedBorderWrapper>
        <HorizontalDashedBorder fill={theme.palette.greyScale.grey200} />
      </SecondHorizontalDashedBorderWrapper>
    </>
  );
}

export default DashedBorder;

const FirstHorizontalDashedBorderWrapper = styled.div`
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 116px; // arbitrary
  transform: translate3d(-50%, -50%, 0);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3px;
  padding-left: 16px;
  padding-right: 16px;
`;
const SecondHorizontalDashedBorderWrapper = styled.div`
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 185px;
  transform: translate3d(-50%, -50%, 0);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3px;
  padding-left: 16px;
  padding-right: 16px;
`;
