import MarginTemplate from '@components/layout/MarginTemplate';
import styled from 'styled-components';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import LevelBadge from '@components/common/badges/LevelBadge';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import renderHomeBackground from '@lib/utils/common/renderHomeBackground';
import renderHomeBanki from '@lib/utils/common/renderHomeBanki';
import { useEffect, useState } from 'react';
import Spacer from '@components/layout/Spaceholder';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import {
  fetchKids,
  IKid,
  selectKids,
  selectKidsStatus,
} from '@store/slices/kidsSlice';
import { TLevel } from '@lib/types/common';
import KidList from '@components/home/KidList';

function ParentHome() {
  const [selectedKid, setSelectedKid] = useState<IKid | null>(null);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function hydrate() {
      try {
        const response = await dispatch(fetchKids({ axiosPrivate })).unwrap();
        if (response.data === []) {
          setSelectedKid(null);
        } else {
          setSelectedKid(response.data[0]); // init with first-child
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

  const kids = useAppSelector(selectKids);
  const kidsStatus = useAppSelector(selectKidsStatus);
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

  return (
    <Wrapper>
      <Content>
        <MarginTemplate>
          <div className="logo-positioner">
            <BANKIDZ />
          </div>
          {kidsContent}
          <StyledHeader>{`돈길 걷는 뱅키는\n행복해요`}</StyledHeader>
          <div className="level-badge-positioner">
            <LevelBadge level={selectedLevel} />
          </div>
          <Spacer />
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

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  position: absolute;
  z-index: 2;

  .logo-positioner {
    width: 100.24px;
    height: 15.82px;
    margin-top: 17.73px;
    margin-left: 3.79px;
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

const StyledHeader = styled.header`
  margin-top: 46px;
  margin-left: 10px;
  width: 308px;
  height: 58px;
  white-space: pre-line;

  ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
  color: ${({ theme }) => theme.palette.greyScale.white};
  line-height: 150%;
`;

const WalkingDongilsWrapper = styled.div`
  margin-top: 48px;

  header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const WaitingDongilWrapper = styled.div`
  margin-top: 48px;

  header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

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
  z-index: 3;
  position: absolute;
  top: 146px;
  right: 0;
`;
