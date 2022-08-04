import MarginTemplate from '@components/layout/MarginTemplate';
import styled, { css } from 'styled-components';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { useAppSelector } from '@store/app/hooks';
import LevelBadge from '@components/common/badges/LevelBadge';
import { selectIsKid, selectLevel } from '@store/slices/authSlice';
import renderHomeBackground from '@lib/utils/common/renderHomeBackground';
import renderHomeBanki from '@lib/utils/common/renderHomeBanki';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import { TLevel } from '@lib/types/common';
import {
  selectHasMultipleKids,
  selectSelectedKid,
} from '@store/slices/kidsSlice';

type TUsage = 'KidHome' | 'ParentHome';

interface KidHomeProps {
  children: React.ReactNode;
  usage: TUsage;
}

function HomeTemplate({ children, usage }: KidHomeProps) {
  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);

  let level: TLevel = 1;
  if (usage === 'KidHome') {
    level = useAppSelector(selectLevel)!;
  } else if (usage === 'ParentHome') {
    level = selectedKid?.level!;
  }
  const colorByLevel = getColorByLevel(level!);

  //TODO: for demo day
  let headerText = '테스트';
  // const isKid = useAppSelector(selectIsKid);
  // console.log('isKid: ', isKid);
  // if (isKid === true) {
  //   // 한규진
  //   headerText = `조금만 더 걸으면\n뱅키임당을 만날 수 있어요`;
  // } else if (isKid === true) {
  //   // 주어진
  //   headerText = `실패한 돈길을 확인하고,\n앞으로를 대비해요`;
  // } else {
  //   // 부모
  //   headerText = `돈길 걷는 뱅키는\n행복해요`;
  // }
  // console.log('headerText: ', headerText);
  return (
    <Wrapper>
      <FixedBar colorByLevel={colorByLevel}>
        <BANKIDZ className="logo" />
      </FixedBar>
      <Content>
        <MarginTemplate>
          <FlexContainer>
            <StyledHeader hasMultipleKids={hasMultipleKids!}>
              {/* {`돈길 걷는 뱅키는\n행복해요`} */}
              {headerText}
            </StyledHeader>
            <LevelBadgeWrapper>
              <LevelBadge level={level} />
            </LevelBadgeWrapper>
          </FlexContainer>
        </MarginTemplate>
        {children}
      </Content>
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
    </Wrapper>
  );
}

export default HomeTemplate;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

const FixedBar = styled.div<{ colorByLevel: string }>`
  z-index: 3;
  background: ${({ colorByLevel }) => colorByLevel};
  position: fixed;
  width: 100%;
  height: 48px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .logo {
    height: 15.82px;
    margin-left: 19.79px;
    margin-top: 17.73px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  position: absolute;
  z-index: 2;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LevelBadgeWrapper = styled.div`
  margin-top: 24px;
  margin-left: 10px;
`;

const StyledHeader = styled.header<{ hasMultipleKids: boolean }>`
  ${({ hasMultipleKids }) =>
    hasMultipleKids === true
      ? css`
          margin-top: 141px;
        `
      : css`
          margin-top: 64px;
        `}
  margin-left: 10px;
  width: 308px;
  height: 58px;
  white-space: pre-line;

  ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
  color: ${({ theme }) => theme.palette.greyScale.white};
  line-height: 150%;
`;

// absolutely positioned background components
const BackgroundBox = styled.div<{
  colorByLevel: string;
  hasMultipleKids: boolean;
}>`
  ${({ hasMultipleKids }) =>
    hasMultipleKids === true
      ? css`
          height: 472px;
        `
      : css`
          height: 393px;
        `}
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  width: 100%;
  z-index: 1;
  background-color: ${({ colorByLevel }) => colorByLevel};
`;

const BackgroundEllipse = styled.div<{
  colorByLevel: string;
  hasMultipleKids: boolean;
}>`
  ${({ hasMultipleKids }) =>
    hasMultipleKids === true
      ? css`
          top: 410px;
        `
      : css`
          top: 337px;
        `}
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  width: 530px;
  height: 230px;
  border-radius: 265px / 115px;
  z-index: 1;
  background-color: ${({ colorByLevel }) => colorByLevel};
`;

const HomeBackgroundWrapper = styled.div<{ hasMultipleKids: boolean }>`
  ${({ hasMultipleKids }) =>
    hasMultipleKids === true
      ? css`
          top: 125px;
        `
      : css`
          top: 48px;
        `}
  z-index: 1;
  position: absolute;
  right: 0;
`;

const HomeBankiWrapper = styled.div<{ hasMultipleKids: boolean }>`
  ${({ hasMultipleKids }) =>
    hasMultipleKids === true
      ? css`
          top: 223px;
        `
      : css`
          top: 146px;
        `}
  z-index: 2;
  position: absolute;
  right: 0;
`;
