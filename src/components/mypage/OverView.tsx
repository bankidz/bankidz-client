import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectAuth } from '@store/slices/authSlice';
import styled from 'styled-components';
import renderRoleIllust from '@lib/utils/common/renderRoleIllust';
import { useEffect } from 'react';
import { fetchKidOverView, TKidOverView } from '@store/slices/kidOverViewSlice';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import OverViewData from './OverViewData';
export type OverViewProps = {
  isKid: boolean;
  kidOverView: TKidOverView;
};

function OverView({ isKid, kidOverView }: OverViewProps) {
  const auth = useAppSelector(selectAuth);
  const { achievedChallenge, totalChallenge } = kidOverView;
  return (
    <Wrapper>
      <Container isKid={isKid}>
        <Banki>{renderRoleIllust(auth.isKid!, auth.isFemale!)}</Banki>
        <p>
          {auth.username} {isKid && '뱅키'}
        </p>
        <OverViewData
          isKid={isKid}
          achievedChallenge={achievedChallenge}
          totalChallenge={totalChallenge}
        />
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

const Banki = styled.div`
  height: 80px;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  left: 50%;
`;
