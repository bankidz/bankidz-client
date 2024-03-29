import { Suspense, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import CriticalErrorBoundary from '@components/atoms/errorBoundary/CriticalErrorBoundary';
import SkeletonOverview from '@components/atoms/skeletons/SkeletonOverView';
import { selectIsKid } from '@store/slices/authSlice';
import { useAppSelector } from '@store/app/hooks';
import OverView from '@components/blocks/mypage/OverView';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';
import { ReactComponent as Setting } from '@assets/icons/setting.svg';
import FamilySection from '@components/blocks/mypage/FamilySection';
import KidsRecord from '@components/blocks/mypage/KidsRecord';
import MyLevel from '@components/blocks/mypage/MyLevel';
import LargeSpacer from '@components/atoms/layout/LargeSpacer';
import useModals from '@lib/hooks/useModals';
import { modals } from '@components/atoms/modals/Modals';

const Mypage = () => {
  const isKid = useAppSelector(selectIsKid) || false;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { openModal } = useModals();

  const openFamilyCreatedModal = () => {
    if (state && state.newFamily) {
      openModal(modals.primaryModal, {
        headerText: `가족이 그룹에 참여했어요`,
        bodyText: '이제 그룹 내 구성원들과 함께 돈길을 계약해봐요!',
        isFamilyCreated: true,
        shouldCloseOnOverlayClick: true,
      });
    }
  };

  useEffect(() => {
    openFamilyCreatedModal();
  }, []);

  return (
    <CriticalErrorBoundary>
      <Wrapper>
        <Header>
          마이페이지
          <Setting onClick={() => navigate('manage')} />
        </Header>
        <MarginTemplate>
          {/* 로딩중일땐 오버뷰 스켈레톤만 띄우도록 합니다. */}
          <Suspense fallback={<SkeletonOverview isKid={isKid} />}>
            <OverView />
            <Section>{isKid ? <MyLevel /> : <KidsRecord />}</Section>
            <Section>
              <FamilySection />
            </Section>
          </Suspense>
        </MarginTemplate>
        <LargeSpacer />
      </Wrapper>
    </CriticalErrorBoundary>
  );
};

export default Mypage;

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
`;

const Header = styled.div`
  ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
  color: ${({ theme }) => theme.palette.greyScale.black};
  height: 48px;
  padding: 0px 6px 0px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 3;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
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
