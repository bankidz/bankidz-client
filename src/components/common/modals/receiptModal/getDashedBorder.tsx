import { ReactComponent as HorizontalDashedBorder } from '@assets/borders/horizontal-dashed-border.svg';
import { ReactComponent as VerticalDashedBorder } from '@assets/borders/vertical-dashed-border.svg';
import { theme } from '@lib/styles/theme';
import styled from 'styled-components';

function getDashedBorder() {
  return (
    <>
      <VerticalDashedBorderWrapper>
        <VerticalDashedBorder />
      </VerticalDashedBorderWrapper>
      <FirstHorizontalDashedBorderWrapper>
        <HorizontalDashedBorder fill={theme.palette.greyScale.grey100} />
      </FirstHorizontalDashedBorderWrapper>
      <SecondHorizontalDashedBorderWrapper>
        <HorizontalDashedBorder fill={theme.palette.greyScale.grey100} />
      </SecondHorizontalDashedBorderWrapper>
      <ThirdHorizontalDashedBorderWrapper>
        <HorizontalDashedBorder fill={theme.palette.greyScale.grey100} />
      </ThirdHorizontalDashedBorderWrapper>
    </>
  );
}

export default getDashedBorder;

const VerticalDashedBorderWrapper = styled.div`
  z-index: 700;
  position: absolute;
  left: 50%;
  top: 167px;
  transform: translate3d(-50%, -50%, 0);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 2px;
  height: 100px;
`;

const FirstHorizontalDashedBorderWrapper = styled.div`
  z-index: 700;
  position: absolute;
  left: 50%;
  top: 115px;
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
  z-index: 700;
  position: absolute;
  left: 50%;
  top: 216px;
  transform: translate3d(-50%, -50%, 0);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3px;
  padding-left: 16px;
  padding-right: 16px;
`;

const ThirdHorizontalDashedBorderWrapper = styled.div`
  z-index: 700;
  position: absolute;
  left: 50%;
  top: 286px;
  transform: translate3d(-50%, -50%, 0);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3px;
  padding-left: 16px;
  padding-right: 16px;
`;
