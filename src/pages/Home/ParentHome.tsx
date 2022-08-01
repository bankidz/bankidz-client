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
} from '@store/slices/familySlice';
import { TLevel } from '@lib/types/common';
import KidList from '@components/home/KidList';
import Summary from '@components/home/Summary';
import {
  fetchParentSummary,
  selectParentSummary,
  selectParentSummaryStatus,
} from '@store/slices/parentSummarySlice';
import HomeTemplate from '@components/home/HomeTemplate';
import {
  fetchSuggestedDongils,
  selectSuggestedDongils,
  selectSuggestedDongilsStatus,
} from '@store/slices/suggestedDongilsSlice';
import {
  fetchThisWeekSDongils,
  selectThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';

function ParentHome() {
  const kidsStatus = useAppSelector(selectKidsStatus);
  const kids = useAppSelector(selectKids);
  const parentSummaryStatus = useAppSelector(selectParentSummaryStatus);
  const parentSummary = useAppSelector(selectParentSummary);

  const [selectedKid, setSelectedKid] = useState<IKid | null>(null);
  const [hasMultipleKids, setHasMultipleKids] = useState<boolean>(false);
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
        if (response.data.length >= 2) {
          setHasMultipleKids(true);
        }

        // GET: 부모 홈 페이지 Summary 컴포넌트를 위한 주간 진행상황 fetch
        if (parentSummaryStatus === 'idle' && selectedKid === null) {
          // 자녀를 선택하지 않은 초기 상태
          await dispatch(
            fetchParentSummary({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap();
        } else if (parentSummaryStatus === 'idle' && selectedKid !== null) {
          // 초기 조건이 아닌 특정 자녀를 선택한 상태
          await dispatch(
            fetchParentSummary({
              axiosPrivate,
              kidId: selectedKid!.kidId,
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
  let parentSummaryContent;
  if (parentSummaryStatus === 'loading') {
    parentSummaryContent = (
      <Summary usage="ParentHome" currentSavings={0} totalPrice={0} />
    );
  } else if (parentSummaryStatus === 'succeeded') {
    const { currentSavings, totalPrice } = parentSummary!;
    parentSummaryContent = (
      <Summary
        usage="ParentHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
        username={selectedKid?.username}
      />
    );
  } else if (parentSummaryStatus === 'failed') {
    parentSummaryContent = <p>Failed</p>;
  }

  // GET: 제안받은 돈길, 금주의 돈길
  const suggestedDongilsStatus = useAppSelector(selectSuggestedDongilsStatus);
  const suggestedDongils = useAppSelector(selectSuggestedDongils);
  const canFetchSuggestedDongils =
    suggestedDongilsStatus === 'idle' && selectedKid !== null;
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);
  const canFetchThisWeekSDongils =
    thisWeekSDongilsStatus === 'idle' && selectedKid !== null;
  useEffect(() => {
    async function fetchSelectedKidSDongils() {
      try {
        if (canFetchSuggestedDongils) {
          await dispatch(
            fetchSuggestedDongils({ axiosPrivate, kidId: selectedKid?.kidId }),
          ).unwrap();
        }
        if (canFetchThisWeekSDongils) {
          await dispatch(
            fetchThisWeekSDongils({ axiosPrivate, kidId: selectedKid?.kidId }),
          ).unwrap();
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchSelectedKidSDongils();
  }, [selectedKid]);

  return (
    <>
      {hasMultipleKids === true && (
        <KidListWrapper colorByLevel={colorByLevel}>
          {kidsContent}
        </KidListWrapper>
      )}
      <HomeTemplate
        usage="ParentHome"
        hasMultipleKids={hasMultipleKids}
        selectedLevel={selectedLevel}
      >
        <MarginTemplate>
          <SummaryWrapper>{parentSummaryContent}</SummaryWrapper>
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
      </HomeTemplate>
    </>
  );
}

export default ParentHome;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;

const KidListWrapper = styled.div<{ colorByLevel: string }>`
  margin-top: 47px; // overlaps 1px
  height: 47px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  z-index: 3;
  width: 100%;
  background: ${({ colorByLevel }) => colorByLevel};
  position: fixed;
`;
