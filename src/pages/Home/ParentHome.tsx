import MarginTemplate from '@components/layout/MarginTemplate';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
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
  fetchThisWeekSDongils,
  selectThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';
import EmptyDongil from '@components/home/EmptyDongil';
import ProposedDongilList from '@components/home/proposed/ProposedDongilList';
import { useSelector } from 'react-redux';
import ThisWeekSDongilList from '@components/home/thisWeekS/ThisWeekSDongilList';
import {
  fetchProposedDongils,
  selectProposedDongils,
  selectProposedDongilsStatus,
} from '@store/slices/proposedDongilsSlice';

function ParentHome() {
  const kidsStatus = useAppSelector(selectKidsStatus);
  const kids = useAppSelector(selectKids);
  const parentSummaryStatus = useAppSelector(selectParentSummaryStatus);
  const parentSummary = useAppSelector(selectParentSummary);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);

  const [selectedKid, setSelectedKid] = useState<IKid | null>(null);
  const [hasMultipleKids, setHasMultipleKids] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [selectedLevel, setSelectedLevel] = useState<TLevel>(1);

  useEffect(() => {
    async function hydrate() {
      try {
        let response;
        // GET: 연결된 자녀 목록 조회
        if (kidsStatus === 'idle') {
          response = await dispatch(fetchKids({ axiosPrivate })).unwrap();
        }

        if (response.data === []) {
          setSelectedKid(null);
        } else {
          setSelectedKid(response.data[0]); // init with the first kid
          setSelectedLevel(response.data[0].level); // init with the first kid's level
        }

        if (response.data.length >= 2) {
          setHasMultipleKids(true);
        }

        // GET: 첫번째 자녀의 Summary 데이터 조회
        parentSummaryStatus === 'idle' &&
          (await dispatch(
            fetchParentSummary({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
        // GET: 첫번째 자녀의 제안받은 돈길 조회
        proposedDongilsStatus === 'idle' &&
          (await dispatch(
            fetchProposedDongils({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
        // GET: 첫번째 자녀의 금주의 돈길 조희
        thisWeekSDongilsStatus === 'idle' &&
          (await dispatch(
            fetchThisWeekSDongils({
              axiosPrivate,
              kidId: response.data[0].kidId,
            }),
          ).unwrap());
      } catch (error: any) {
        console.log(error.message);
      }
    }
    hydrate();
  }, []);

  // 자녀 목록
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

  // 선택한 자녀에 따라 Level 업데이트
  useEffect(() => {
    selectedKid && setSelectedLevel(selectedKid.level);
  }, [selectedKid]);
  const colorByLevel = getColorByLevel(selectedLevel);

  // GET: 부모 홈 페이지 Summary 컴포넌트를 위한 주간 진행상황 fetch
  // useEffect(() => {
  //   async function hydrate() {
  //     try {
  //       if (parentSummaryStatus === 'idle' && selectedKid === null) {
  //         // 자녀를 선택하지 않은 초기 상태
  //         await dispatch(
  //           fetchParentSummary({
  //             axiosPrivate,
  //             kidId: response.data[0].kidId,
  //           }),
  //         ).unwrap();
  //       } else if (parentSummaryStatus === 'idle' && selectedKid !== null) {
  //         // 초기 조건이 아닌 특정 자녀를 선택한 상태
  //         await dispatch(
  //           fetchParentSummary({
  //             axiosPrivate,
  //             kidId: selectedKid!.kidId,
  //           }),
  //         ).unwrap();
  //       }
  //     } catch (error: any) {
  //       console.log(error.message);
  //     }
  //   }
  // }, [selectedKid]);

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

  const proposedDongils = useAppSelector(selectProposedDongils);
  function getProposedKidSSuggestedDongils(username: string) {
    console.log('username: ', username);
    const found = proposedDongils?.find(
      (proposedDongil) => proposedDongil.userName === username,
    );
    return found?.challengeList;
  }

  // 제안받은 돈길
  let proposedDongilsContent;
  if (proposedDongilsStatus === 'loading') {
    proposedDongilsContent = <p>Loading...</p>;
  } else if (proposedDongilsStatus === 'succeeded') {
    const selectedKidSSuggestedDongils = getProposedKidSSuggestedDongils(
      selectedKid?.username!,
    );
    if (proposedDongils === []) {
      proposedDongilsContent = <EmptyDongil property="proposed" />;
    } else {
      proposedDongilsContent = (
        <ProposedDongilList proposedDongils={selectedKidSSuggestedDongils!} />
      );
    }
  } else if (proposedDongilsStatus === 'failed') {
    proposedDongilsContent = <p>Failed</p>;
  }

  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);
  function getSelectedKidSThisWeekSDongils(username: string) {
    console.log('username: ', username);
    const found = thisWeekSDongils?.find(
      (thisWeekSDongil) => thisWeekSDongil.userName === username,
    );
    return found?.challengeList;
  }

  // 금주의 돈길
  let thisWeekSDongilsContent;
  if (proposedDongilsStatus === 'loading') {
    thisWeekSDongilsContent = <p>Loading...</p>;
  } else if (proposedDongilsStatus === 'succeeded') {
    const selectedKidSThisWeekSDongils = getSelectedKidSThisWeekSDongils(
      selectedKid?.username!,
    );
    if (proposedDongils === []) {
      thisWeekSDongilsContent = <EmptyDongil property="thisWeekS" />;
    } else {
      thisWeekSDongilsContent = (
        <ThisWeekSDongilList thisWeekSDongils={selectedKidSThisWeekSDongils!} />
      );
    }
  } else if (proposedDongilsStatus === 'failed') {
    thisWeekSDongilsContent = <p>Failed</p>;
  }

  // function handleClick() {
  //   console.log('selectedKid: ', selectedKid);
  //   console.log('selectedLevel: ', selectedLevel);
  // }

  return (
    <>
      {/* <button onClick={handleClick}>Test</button> */}
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
          <SuggestedDongilsWrapper>
            <header>제안받은 돈길</header>
            {proposedDongilsContent}
          </SuggestedDongilsWrapper>
          <ThisWeekSDongilWrapper>
            <header>금주의 돈길</header>
            {thisWeekSDongilsContent}
          </ThisWeekSDongilWrapper>
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

const SuggestedDongilsWrapper = styled.div`
  margin-top: 48px;
  header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const ThisWeekSDongilWrapper = styled.div`
  margin-top: 48px;
  header {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;
