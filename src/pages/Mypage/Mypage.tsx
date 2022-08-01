import LargeSpacer from '@components/layout/LargeSpacer';
import MarginTemplate from '@components/layout/MarginTemplate';
import SmallSpacer from '@components/layout/SmallSpacer';
import FamilyList from '@components/mypage/FamilyList';
import MyLevel from '@components/mypage/MyLevel';
import OverView from '@components/mypage/OverView';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import {
  fetchKids,
  fetchFamily,
  selectKidsStatus,
  selectFamilyStatus,
  selectFamily,
} from '@store/slices/familySlice';
import {
  fetchKidOverView,
  selectKidOverView,
  selectKidOverViewStatus,
} from '@store/slices/kidOverViewSlice';
import { useEffect } from 'react';
import styled from 'styled-components';

function Mypage() {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const isKid = useAppSelector(selectIsKid)!;
  const familyStatus = useAppSelector(selectFamilyStatus);
  const family = useAppSelector(selectFamily);
  const kidOverView = useAppSelector(selectKidOverView);
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchKidOverView({ axiosPrivate })).unwrap();
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
        <OverView isKid={isKid} kidOverView={kidOverView} />
        {isKid && (
          <Section>
            <h2>MY 레벨</h2>
            {kidOverView ? (
              <MyLevel achievedChallenge={kidOverView.achievedChallenge} />
            ) : (
              'loading...'
            )}
          </Section>
        )}
        <Section>
          <h2>가족 관리</h2>
          {family ? <FamilyList family={family} /> : 'null'}
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
  height: 100vh;
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

const Section = styled.div`
  margin-top: 80px;
  & > h2 {
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 24px;
  }
`;
