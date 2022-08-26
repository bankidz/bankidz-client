import LargeSpacer from '@components/layout/LargeSpacer';
import MarginTemplate from '@components/layout/MarginTemplate';
import FamilyList from '@components/mypage/FamilyList';
import KidsRecordList from '@components/mypage/KidsRecordList';
import MyLevel from '@components/mypage/MyLevel';
import OverView from '@components/mypage/OverView';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
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
import { darken } from 'polished';
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
  const { setOpenBottomSheet } = useGlobalBottomSheet();

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

  const openCreateDongilCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      sheetProps: { open: true },
      contentProps: {
        type: 'createGroup',
      },
    });
  };

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
          {family?.length ? (
            <FamilyList family={family} />
          ) : (
            <CreateDongil onClick={openCreateDongilCompletedSheet}>
              <p>가족그룹 만들기</p>
              <p>그룹을 만들고 가족을 초대해봐요</p>
            </CreateDongil>
          )}
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
  //z-index: 5;
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

const CreateDongil = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  padding: 16px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.small};
  &:active {
    background-color: ${darken(0.02, '#fff')};
  }
  & > p:first-child {
    ${({ theme }) => theme.typo.text.T_18_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 8px;
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.text.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;
