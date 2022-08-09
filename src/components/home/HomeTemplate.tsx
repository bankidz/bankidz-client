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
  selectKids,
  selectKidsStatus,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import { useEffect } from 'react';
import { TLevel } from '@lib/types/TLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import KidList from './KidList';

type TVariant = 'KidHome' | 'ParentHome';

interface HomeTemplateProps {
  children: React.ReactNode;
  variant: TVariant;
}

function HomeTemplate({ children, variant }: HomeTemplateProps) {
  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);
  let level: TLevel;
  if (variant === 'KidHome') {
    level = useAppSelector(selectLevel)!;
  } else if (variant === 'ParentHome') {
    level = selectedKid?.level!;
  }
  const colorByLevel = getColorByLevel(level!);

  //TODO: demo day
  let headerText;
  const isKid = useAppSelector(selectIsKid);
  if (isKid === true && (level! === -4 || level! === 0)) {
    // 자녀 - 한규진
    // TODO: 백 수정 이후 level: 0인 경우 삭제
    headerText = `조금만 더 걸으면\n뱅키임당을 만날 수 있어요`;
  } else if (isKid === true && level! === 2) {
    // 자녀 - 주어진
    headerText = `실패한 돈길을 확인하고,\n앞으로를 대비해요`;
  } else if (isKid === false && (level! === -4 || level! === 0)) {
    // 부모 - 한규진 선택
    // TODO: 백 수정 이후 level: 0인 경우 삭제
    headerText = `자녀의 저축 레벨이\n곧 있으면 올라가요`;
  } else if (isKid === false && level! === 2) {
    // 부모 - 주어진 선택
    headerText = `자녀가 저축에 실패하지\n않도록 격려해주세요`;
  }

  // 뒤로가기 차단
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

  const kidsStatus = useAppSelector(selectKidsStatus);
  const kids = useAppSelector(selectKids);
  // 자녀 목록
  let kidsContent;
  if (kidsStatus === 'loading') {
    kidsContent = <p>Loading</p>;
  } else if (kidsStatus === 'succeeded') {
    kidsContent = <KidList />;
  } else if (kidsContent === 'failed') {
    kidsContent = <p>Failed</p>;
  }

  return (
    <Wrapper>
      <FixedBar colorByLevel={colorByLevel} hasMultipleKids={hasMultipleKids}>
        <div className="logo-wrapper">
          <BANKIDZ />
        </div>
        {hasMultipleKids === true && (
          <KidListWrapper colorByLevel={colorByLevel}>
            {kidsContent}
          </KidListWrapper>
        )}
      </FixedBar>
      <Content>
        <MarginTemplate>
          <FlexContainer>
            <StyledHeader hasMultipleKids={hasMultipleKids!}>
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

const FixedBar = styled.div<{ colorByLevel: string; hasMultipleKids: boolean }>`
  ${({ hasMultipleKids }) =>
    hasMultipleKids === true
      ? css`
          height: 95px;
        `
      : css`
          height: 48px;
        `}
  z-index: 3;
  background: ${({ colorByLevel }) => colorByLevel};
  transition: ${({ theme }) => theme.transition.onFocus};
  transition-property: background-color;
  position: fixed;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .logo-wrapper {
    width: 100.24px;
    height: 15.82px;
    margin-left: 19.79px;
    margin-top: 17.73px;
  }
`;

const KidListWrapper = styled.div<{ colorByLevel: string }>`
  margin-top: 38.44px;
  width: 250px;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  z-index: 3;
  width: 100%;
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

const StyledHeader = styled.h1<{ hasMultipleKids: boolean }>`
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
          height: 350px;
        `
      : css`
          height: 275px;
        `}
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  width: 100%;
  z-index: 0;
  background-color: ${({ colorByLevel }) => colorByLevel};
  transition: ${({ theme }) => theme.transition.onFocus};
  transition-property: background-color;
`;

const BackgroundEllipse = styled.div<{
  colorByLevel: string;
  hasMultipleKids: boolean;
}>`
  ${({ hasMultipleKids }) =>
    hasMultipleKids === true
      ? css`
          @keyframes slide {
            from {
              top: 290px;
            }
            to {
              top: 410px;
            }
          }
        `
      : css`
          @keyframes slide {
            from {
              top: 225px;
            }
            to {
              top: 337px;
            }
          }
        `}
  animation: slide 0.25s ease-in forwards; // when mounted

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
