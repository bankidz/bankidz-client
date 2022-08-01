import MarginTemplate from '@components/layout/MarginTemplate';
import styled, { css } from 'styled-components';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import LevelBadge from '@components/common/badges/LevelBadge';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import renderHomeBackground from '@lib/utils/common/renderHomeBackground';
import renderHomeBanki from '@lib/utils/common/renderHomeBanki';
import { useEffect, useState } from 'react';
import LargeSpacer from '@components/layout/LargeSpacer';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import {
  fetchKids,
  IKid,
  selectKids,
  selectKidsStatus,
} from '@store/slices/kidsSlice';
import { TLevel } from '@lib/types/common';
import KidList from '@components/home/KidList';
import Summary from '@components/home/Summary';
import {
  fetchParentWeeklyProgress,
  selectParentWeeklyProgress,
  selectParentWeeklyProgressStatus,
} from '@store/slices/parentWeeklyProgressSlice';

function ParentHome() {
  const kidsStatus = useAppSelector(selectKidsStatus);
  const kids = useAppSelector(selectKids);
  const parentWeeklyProgressStatus = useAppSelector(
    selectParentWeeklyProgressStatus,
  );
  const parentWeeklyProgress = useAppSelector(selectParentWeeklyProgress);

  const [selectedKid, setSelectedKid] = useState<IKid | null>(null);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function hydrate() {
      try {
        // GET: 연결된 자녀 목록 fetch
        let response;
        if (kidsStatus === 'idle') {
          response = await dispatch(fetchKids({ axiosPrivate })).unwrap();
        }
        if (response.data === []) {
          setSelectedKid(null);
        } else {
          setSelectedKid(response.data[0]); // init with first-child
        }

        // GET: 부모 홈 페이지 Summary 컴포넌트를 위한 주간 진행상황 fetch
        if (parentWeeklyProgressStatus === 'idle' && selectedKid === null) {
          // 자녀를 선택하지 않은 초기 상태
          await dispatch(
            fetchParentWeeklyProgress({
              axiosPrivate,
              username: response.data[0].username,
            }),
          ).unwrap();
        } else if (
          parentWeeklyProgressStatus === 'idle' &&
          selectedKid !== null
        ) {
          // 초기 조건이 아닌 특정 자녀를 선택한 상태
          await dispatch(
            fetchParentWeeklyProgress({
              axiosPrivate,
              username: selectedKid!.username,
            }),
          ).unwrap();
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
    hydrate();
  }, []);

  // 선택된 자녀에 따른 Level 업데이트
  const [selectedLevel, setSelectedLevel] = useState<TLevel>(1);
  useEffect(() => {
    if (selectedKid === null) {
      setSelectedLevel(1);
    } else {
      setSelectedLevel(selectedKid.level);
    }
  }, [selectedKid]);
  const colorByLevel = getColorByLevel(selectedLevel);

  let kidsContent;
  if (kidsStatus === 'loading') {
    kidsContent = <p>Loading</p>;
  } else if (kidsStatus === 'succeeded') {
    kidsContent = (
      <KidList
        kids={kids!}
        selectedKid={selectedKid!}
        setSelectedKid={setSelectedKid}
      />
    );
  } else if (kidsContent === 'failed') {
    kidsContent = <p>Failed</p>;
  }

  // 주간 진행상황
  let parentWeeklyProgressContent;
  if (parentWeeklyProgressStatus === 'loading') {
    parentWeeklyProgressContent = (
      <Summary usage="ParentHome" currentSavings={0} totalPrice={0} />
    );
  } else if (parentWeeklyProgressStatus === 'succeeded') {
    const { currentSavings, totalPrice } = parentWeeklyProgress!;
    parentWeeklyProgressContent = (
      <Summary
        usage="ParentHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
        username={selectedKid?.username}
      />
    );
  } else if (parentWeeklyProgressStatus === 'failed') {
    parentWeeklyProgressContent = <p>Failed</p>;
  }

  return (
    <Wrapper>
      <FixedBar colorByLevel={colorByLevel} kids={kids}>
        <BANKIDZ className="logo" />
        <div className="kids-list-wrapper">{kidsContent}</div>
      </FixedBar>
      <Content colorByLevel={colorByLevel}>
        <MarginTemplate>
          <StyledHeader
            kids={kids}
          >{`돈길 걷는 뱅키는\n행복해요`}</StyledHeader>
          <div className="level-badge-positioner">
            <LevelBadge level={selectedLevel} />
          </div>
          <div className="summary-positioner">
            {parentWeeklyProgressContent}
          </div>

          {/* <SuggestedDongilsWrapper>
            <header>제안받은 돈길</header>
          </SuggestedDongilsWrapper> */}
          <LargeSpacer />
          <LargeSpacer />
          <LargeSpacer />
          <LargeSpacer />
          <LargeSpacer />
          <LargeSpacer />
          <LargeSpacer />
        </MarginTemplate>
      </Content>

      {/* absolutely positioned background components */}
      <BackgroundBox colorByLevel={colorByLevel} />
      <BackgroundEllipse colorByLevel={colorByLevel} />
      <HomeBackgroundPositioner>
        {renderHomeBackground(selectedLevel!)}
      </HomeBackgroundPositioner>
      <HomeBankiPositioner>
        {renderHomeBanki(selectedLevel!)}
      </HomeBankiPositioner>
    </Wrapper>
  );
}

export default ParentHome;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

const FixedBar = styled.div<{ colorByLevel: string; kids: IKid[] | null }>`
  z-index: 3;
  background: ${({ colorByLevel }) => colorByLevel};
  position: fixed;
  width: 100%;
  ${({ kids }) =>
    kids !== null && kids.length >= 2
      ? css`
          height: 95px;
        `
      : css`
          height: 48px;
        `}
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

const Content = styled.div<{ colorByLevel: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  position: absolute;
  z-index: 2;

  .kids-list-wrapper {
    margin-top: 47px; // overlaps 1px
    background: pink;
    z-index: 3;
    height: 47px;
    width: 100%;
    background: ${({ colorByLevel }) => colorByLevel};
    position: fixed;
  }
  .level-badge-positioner {
    margin-top: 24px;
    margin-left: 10px;
  }
  .summary-positioner {
    height: 120px;
    margin-top: 198px;
    width: 100%;
  }
`;

const StyledHeader = styled.header<{ kids: IKid[] | null }>`
  ${({ kids }) =>
    kids !== null && kids.length >= 2
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

// const WalkingDongilsWrapper = styled.div`
//   margin-top: 48px;

//   header {
//     width: 100%;
//     height: 16px;
//     margin-bottom: 24px;
//     ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
//     ${({ theme }) => theme.palette.greyScale.black};
//   }
// `;

// const WaitingDongilWrapper = styled.div`
//   margin-top: 48px;

//   header {
//     width: 100%;
//     height: 16px;
//     margin-bottom: 24px;
//     ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
//     ${({ theme }) => theme.palette.greyScale.black};
//   }
// `;

// absolutely positioned background components
const BackgroundBox = styled.div<{ colorByLevel: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);

  width: 100%;
  height: 393px;
  z-index: 1;
  background-color: ${({ colorByLevel }) => colorByLevel};
`;

const BackgroundEllipse = styled.div<{ colorByLevel: string }>`
  position: absolute;
  top: 337px;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  width: 530px;
  height: 230px;
  border-radius: 265px / 115px;
  z-index: 1;
  background-color: ${({ colorByLevel }) => colorByLevel};
`;

const HomeBackgroundPositioner = styled.div`
  z-index: 1;
  position: absolute;
  top: 48px;
  right: 0;
`;

const HomeBankiPositioner = styled.div`
  z-index: 2;
  position: absolute;
  top: 146px;
  right: 0;
`;
