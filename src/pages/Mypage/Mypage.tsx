import LargeSpacer from '@components/layout/LargeSpacer';
import MarginTemplate from '@components/layout/MarginTemplate';
import FamilyList from '@components/mypage/FamilyList';
import KidsRecordList from '@components/mypage/KidsRecordList';
import MyLevel from '@components/mypage/MyLevel';
import OverView from '@components/mypage/OverView';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import {
  fetchKids,
  fetchFamily,
  selectFamilyStatus,
  selectFamily,
} from '@store/slices/familySlice';
import {
  fetchOverView,
  selectKidOverView,
  selectUserOverView,
} from '@store/slices/overViewSlice';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';

const DemoKidsRecordData = [
  {
    username: '주어진',
    acceptRate: 80,
    acceptRequest: 5,
    achieveRate: 20,
  },
  {
    username: '한규진',
    acceptRate: 70,
    acceptRequest: 25,
    achieveRate: 60,
  },
];

function Mypage() {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const isKid = useAppSelector(selectIsKid)!;
  const familyStatus = useAppSelector(selectFamilyStatus);
  const family = useAppSelector(selectFamily);
  const user = useAppSelector(selectUserOverView);

  const kidOverView = isKid ? useAppSelector(selectKidOverView) : null;
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchOverView({ axiosPrivate })).unwrap();
        if (familyStatus === 'idle')
          await dispatch(fetchFamily({ axiosPrivate })).unwrap();
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <Wrapper>
      <Header>마이페이지</Header>
      <MarginTemplate>
        <OverView user={user} overView={kidOverView} />
        {isKid && kidOverView ? (
          <Section>
            <h2>MY 레벨</h2>
            <MyLevel achievedChallenge={kidOverView.achievedChallenge} />
          </Section>
        ) : (
          <Section smallGap={true}>
            <h2>자녀기록</h2>
            <KidsRecordList kidsRecordData={DemoKidsRecordData} />
          </Section>
        )}
        <Section>
          <h2>가족 관리</h2>
          {family ? <FamilyList family={family} /> : ''}
        </Section>
      </MarginTemplate>
      <LargeSpacer />
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;

const Header = styled.div`
  ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
  color: ${({ theme }) => theme.palette.greyScale.black};
  height: 48px;
  padding: 0px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 5;
`;

const Section = styled.div<{ smallGap?: boolean }>`
  margin-top: 80px;
  ${({ smallGap }) =>
    smallGap &&
    css`
      margin-top: 48px;
    `}
  & > h2 {
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 24px;
  }
`;
