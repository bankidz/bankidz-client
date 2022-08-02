import MarginTemplate from '@components/layout/MarginTemplate';
import styled, { ThemeContext } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useEffect, useState } from 'react';
import LargeSpacer from '@components/layout/LargeSpacer';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import {
  fetchKids,
  selectHasMultipleKids,
  selectKids,
  selectKidsStatus,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
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
import { theme } from '@lib/styles/theme';
import { findAllByAltText } from '@testing-library/react';

function ParentHome() {
  const kidsStatus = useAppSelector(selectKidsStatus);
  const kids = useAppSelector(selectKids);
  const parentSummaryStatus = useAppSelector(selectParentSummaryStatus);
  const parentSummary = useAppSelector(selectParentSummary);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  // when mounted
  useEffect(() => {
    async function hydrate() {
      try {
        let response;
        // GET: 연결된 자녀 목록 조회
        if (kidsStatus === 'idle') {
          response = await dispatch(fetchKids({ axiosPrivate })).unwrap();
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

  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);
  function handleClick() {
    console.log('selectedKid: ', selectedKid);
    console.log('hasMultipleKids: ', hasMultipleKids);
  }

  // 자녀 목록
  let kidsContent;
  if (kidsStatus === 'loading') {
    kidsContent = <p>Loading</p>;
  } else if (kidsStatus === 'succeeded') {
    kidsContent = <KidList />;
  } else if (kidsContent === 'failed') {
    kidsContent = <p>Failed</p>;
  }

  // 선택한 자녀에 따라 Level 업데이트
  const [colorByLevel, setColorByLevel] = useState<string>(
    theme.palette.greyScale.grey100,
  );
  useEffect(() => {
    setColorByLevel(getColorByLevel(selectedKid?.level!));
  }, [selectedKid]);

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

  // 제안받은 돈길
  const proposedDongils = useAppSelector(selectProposedDongils);
  let proposedDongilsContent;
  if (proposedDongilsStatus === 'loading') {
    proposedDongilsContent = <p>Loading...</p>;
  } else if (proposedDongilsStatus === 'succeeded') {
    const selectedKidSProposedDongils = getSelectedKidSProposedDongils(
      selectedKid?.username!,
    );
    if (selectedKidSProposedDongils?.length === 0) {
      proposedDongilsContent = <EmptyDongil property="proposed" />;
    } else {
      proposedDongilsContent = (
        <ProposedDongilList proposedDongils={selectedKidSProposedDongils!} />
      );
    }
  } else if (proposedDongilsStatus === 'failed') {
    proposedDongilsContent = <p>Failed</p>;
  }

  function getSelectedKidSProposedDongils(username: string) {
    const found = proposedDongils?.find(
      (proposedDongil) => proposedDongil.userName === username,
    );
    return found?.challengeList;
  }

  // 금주의 돈길
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);
  let thisWeekSDongilsContent;
  if (proposedDongilsStatus === 'loading') {
    thisWeekSDongilsContent = <p>Loading...</p>;
  } else if (proposedDongilsStatus === 'succeeded') {
    const selectedKidSThisWeekSDongils = getSelectedKidSThisWeekSDongils(
      selectedKid?.username!,
    );
    if (proposedDongils?.length === 0) {
      thisWeekSDongilsContent = <EmptyDongil property="thisWeekS" />;
    } else {
      thisWeekSDongilsContent = (
        <ThisWeekSDongilList thisWeekSDongils={selectedKidSThisWeekSDongils!} />
      );
    }
  } else if (proposedDongilsStatus === 'failed') {
    thisWeekSDongilsContent = <p>Failed</p>;
  }

  function getSelectedKidSThisWeekSDongils(username: string) {
    const found = thisWeekSDongils?.find(
      (thisWeekSDongil) => thisWeekSDongil.userName === username,
    );
    return found?.challengeList;
  }

  // 다자녀의 경우 자녀 선택에 따라 추가 조회
  const canFetchParentSummary = selectedKid !== null;
  const canFetchProposedDongils =
    selectedKid !== null &&
    proposedDongils !== null &&
    !hasProposedDongilsAlreadyBeenFetched();
  const canFetchThisWeekSDongils =
    selectedKid !== null &&
    thisWeekSDongils !== null &&
    !hasThisWeekSDongilsAlreadyBeenFetched();
  useEffect(() => {
    async function hydrate() {
      try {
        // GET: 선택한 자녀의 Summary 데이터 조회
        canFetchParentSummary &&
          (await dispatch(
            fetchParentSummary({
              axiosPrivate,
              kidId: selectedKid.kidId,
            }),
          ).unwrap());
        // GET: 선택한 자녀의 제안받은 돈길 조회
        canFetchProposedDongils &&
          (await dispatch(
            fetchProposedDongils({
              axiosPrivate,
              kidId: selectedKid.kidId,
            }),
          ).unwrap());
        // GET: 선택한 자녀의 금주의 돈길 조희
        canFetchThisWeekSDongils &&
          (await dispatch(
            fetchThisWeekSDongils({
              axiosPrivate,
              kidId: selectedKid.kidId,
            }),
          ).unwrap());
      } catch (error: any) {
        console.log(error.message);
      }
    }
    hydrate();
  }, [selectedKid]);

  function hasProposedDongilsAlreadyBeenFetched() {
    console.log('selectedKid: ', selectedKid);
    console.log('proposedDongils: ', proposedDongils);
    const found = proposedDongils?.find(
      (proposedDongil) => proposedDongil.userName === selectedKid?.username,
    );
    console.log('found: ', found);
    if (found === undefined) {
      console.log('아직 없어');
      return false;
    } else {
      console.log('이미 반입했어');
      return true;
    }
  }
  function hasThisWeekSDongilsAlreadyBeenFetched() {
    const found = thisWeekSDongils?.find(
      (thisWeekSDongil) => thisWeekSDongil.userName === selectedKid?.username,
    );
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <button onClick={handleClick}>Test</button>
      {hasMultipleKids === true && (
        <KidListWrapper colorByLevel={colorByLevel}>
          {kidsContent}
        </KidListWrapper>
      )}
      <HomeTemplate usage="ParentHome">
        <MarginTemplate>
          <SummaryWrapper>{parentSummaryContent}</SummaryWrapper>
          <ProposedDongilsWrapper>
            <header>제안받은 돈길</header>
            {proposedDongilsContent}
          </ProposedDongilsWrapper>
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

const ProposedDongilsWrapper = styled.div`
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
