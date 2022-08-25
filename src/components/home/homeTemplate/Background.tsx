import useLevel from '@lib/hooks/useLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import renderHomeBackground from '@lib/utils/render/renderHomeBackground';
import renderHomeBanki from '@lib/utils/render/renderHomeBanki';
import { useAppSelector } from '@store/app/hooks';
import { selectHasMultipleKids } from '@store/slices/kidsSlice';
import styled from 'styled-components';

function Background() {
  const level = useLevel();
  const colorByLevel = getColorByLevel(level);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);

  return (
    <>
      <BackgroundBox
        colorByLevel={colorByLevel}
        hasMultipleKids={hasMultipleKids!}
      />
      <BackgroundEllipse
        colorByLevel={colorByLevel}
        hasMultipleKids={hasMultipleKids!}
      />
      <HomeBackgroundWrapper hasMultipleKids={hasMultipleKids!}>
        {renderHomeBackground(level!)}
      </HomeBackgroundWrapper>
      <HomeBankiWrapper hasMultipleKids={hasMultipleKids!}>
        {renderHomeBanki(level!)}
      </HomeBankiWrapper>
    </>
  );
}

export default Background;

// absolutely positioned background components
const BackgroundBox = styled.div<{
  colorByLevel: string;
  hasMultipleKids: boolean;
}>`
  height: ${({ hasMultipleKids }) => (hasMultipleKids ? '380px' : '310px')};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  width: 100%;
  z-index: 0;

  background-color: ${({ colorByLevel }) => colorByLevel};
  transition: ${({ theme }) => theme.transition.kidSelect};
  transition-property: background-color;
`;

const BackgroundEllipse = styled.div<{
  colorByLevel: string;
  hasMultipleKids: boolean;
}>`
  top: ${({ hasMultipleKids }) => (hasMultipleKids ? '410px' : '337px')};
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  width: 530px;
  height: 230px;
  border-radius: 265px / 115px;
  z-index: 1;

  background-color: ${({ colorByLevel }) => colorByLevel};
  transition: ${({ theme }) => theme.transition.kidSelect};
  transition-property: background-color;
`;

const HomeBackgroundWrapper = styled.div<{ hasMultipleKids: boolean }>`
  top: ${({ hasMultipleKids }) => (hasMultipleKids ? '125px' : '48px')};
  z-index: 1;
  position: absolute;
  right: 0;
`;

const HomeBankiWrapper = styled.div<{ hasMultipleKids: boolean }>`
  top: ${({ hasMultipleKids }) => (hasMultipleKids ? '223px' : '146px')};
  z-index: 2;
  position: absolute;
  right: 0;
`;
