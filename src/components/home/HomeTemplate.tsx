import MarginTemplate from '@components/layout/MarginTemplate';
import styled, { css } from 'styled-components';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { useAppSelector } from '@store/app/hooks';
import LevelBadge from '@components/common/badges/LevelBadge';
import { selectIsKid, selectLevel } from '@store/slices/authSlice';
import renderHomeBackground from '@lib/utils/render/renderHomeBackground';
import renderHomeBanki from '@lib/utils/render/renderHomeBanki';
import {
  selectHasMultipleKids,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import { calcRatio } from '@lib/styles/theme';
import { useEffect } from 'react';
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';

type TUsage = 'KidHome' | 'ParentHome';

interface HomeTemplateProps {
  children: React.ReactNode;
  usage: TUsage;
}

function HomeTemplate({ children, usage }: HomeTemplateProps) {
  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);

  let level: TLevel;
  if (usage === 'KidHome') {
    level = useAppSelector(selectLevel)!;
  } else if (usage === 'ParentHome') {
    level = selectedKid?.level!;
  }

  const colorByLevel = getColorByLevel(level!);

  //TODO: for demo day
  let headerText;
  const isKid = useAppSelector(selectIsKid);
  if (isKid === true && level! === -4) {
    // 자녀 - 한규진
    headerText = `조금만 더 걸으면\n뱅키임당을 만날 수 있어요`;
  } else if (isKid === true && level! === 2) {
    // 자녀 - 주어진
    headerText = `실패한 돈길을 확인하고,\n앞으로를 대비해요`;
  } else if (isKid === false && level! === -4) {
    // 부모 -> 한규진
    headerText = `자녀의 저축 레벨이\n곧 있으면 올라가요`;
  } else if (isKid === false && level! === 2) {
    // 부모 -> 주어진
    headerText = `자녀가 저축에 실패하지\n않도록 격려해주세요`;
  }

  // 온보딩으로 뒤로가기 차단
  const preventGoBack = () => {
    history.pushState(null, '', location.href);
  };
  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);
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
              <LevelBadge level={level!} />
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
  height: calc(var(--vh, 1vh) * 100);
`;

const FixedBar = styled.div<{ colorByLevel: string }>`
  z-index: 3;
  background: ${({ colorByLevel }) => colorByLevel};
  transition: ${({ theme }) => theme.transition.onFocus};
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
          height: 415px;
        `
      : css`
          height: 345px;
        `}
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  width: 100%;
  z-index: 1;
  background-color: ${({ colorByLevel }) => colorByLevel};
  transition: ${({ theme }) => theme.transition.onFocus};
`;

// const Background = styled.div<{ colorByLevel: string }>`
//   position: absolute;
//   top: 0;
//   left: 50%;
//   z-index: 1;
//   transform: translate3d(-50%, 0, 0);

//   height: 288px;
//   width: 100%;
//   background-color: ${({ colorByLevel }) => colorByLevel};

//   &:after {
//     width: ${calcRatio(530, 360)};
//     margin: 0 auto;
//     height: 230px;
//     background-color: ${({ theme }) => theme.palette.greyScale.white};
//     border-radius: 50%;
//     position: absolute;
//     top: 257px;
//     left: calc(-${calcRatio(530, 360)} / 2 + 50%);
//     content: '';
//   }
// `;

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
  transition: ${({ theme }) => theme.transition.onFocus};
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
