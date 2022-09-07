import MarginTemplate from '@components/layout/MarginTemplate';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import { fetchNotPayedInterest } from '@store/slices/notPayedInterestsSlice';
import { useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import InterestToPayList from './InterestToPayList';

function InterestToPay() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);

  useEffect(() => {
    dispatch(
      fetchNotPayedInterest({ axiosPrivate, kidId: selectedKid?.kidId! }),
    );
  }, []);

  return (
    <>
      <Header hasMultipleKids={hasMultipleKids}>
        <h1>지급이 필요한 이자</h1>
        <h2>0원</h2>
      </Header>
      <InterestToPayList />
    </>
  );
}

export default InterestToPay;

const Header = styled.header<{ hasMultipleKids: boolean }>`
  margin-top: ${({ hasMultipleKids }) => (hasMultipleKids ? '159px' : '112px')};
  h1 {
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  h2 {
    margin-top: 12px;
    ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
