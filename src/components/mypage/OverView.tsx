import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectAuth } from '@store/slices/authSlice';
import styled, { css } from 'styled-components';
import renderRoleIllust from '@lib/utils/common/renderRoleIllust';
import { useEffect } from 'react';
import { fetchKidOverView, TKidOverView } from '@store/slices/kidOverViewSlice';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import OverViewData from './OverViewData';
import { calcRatio } from '@lib/styles/theme';
export type OverViewProps = {
  isKid: boolean;
  kidOverView: TKidOverView | null;
};

function OverView({ isKid, kidOverView }: OverViewProps) {
  const auth = useAppSelector(selectAuth);
  return (
    <Wrapper>
      <Container isKid={isKid}>
        <Banki isKid={auth.isKid!} isFemale={auth.isFemale!}>
          {renderRoleIllust(auth.isKid!, auth.isFemale!)}
        </Banki>
        <p>
          {auth.username} {isKid && '뱅키'}
        </p>
        {kidOverView && <OverViewData isKid={isKid} kid={kidOverView} />}
      </Container>
    </Wrapper>
  );
}

export default OverView;

const Wrapper = styled.div``;

const Container = styled.div<{ isKid: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  height: ${({ isKid }) => (isKid ? 168 : 91)}px;

  margin-top: 122px;
  position: relative;

  & > p {
    ${({ theme }) => theme.typo.text.T_18_EB}
    color: ${({ theme }) => theme.palette.main.yellow400};
    text-align: center;
    padding-top: 53px;
    margin-bottom: 24px;
  }
`;

const Banki = styled.div<{ isKid: boolean; isFemale: boolean }>`
  width: 128px;
  position: absolute;
  transform: translate3d(-50%, -66px, 0);
  left: 50%;

  // 아빠
  ${({ isKid, isFemale }) =>
    isKid === false &&
    isFemale === false &&
    css`
      padding: 23px 15.87px 0px 25px;
    `}
  // 엄마
      ${({ isKid, isFemale }) =>
    isKid === false &&
    isFemale === true &&
    css`
      padding: 23px 14.44px 0px 16px;
    `}
      // 아들
      ${({ isKid, isFemale }) =>
    isKid === true &&
    isFemale === false &&
    css`
      padding: 21px 14.9px 2px 25px;
    `}
      // 딸
      ${({ isKid, isFemale }) =>
    isKid === true &&
    isFemale === true &&
    css`
      padding: 23px 12.9px 0px 14px;
    `}
`;
