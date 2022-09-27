import styled from 'styled-components';
import FixedBar from './FixedBar';
import Background from '@components/home/homeTemplate/Background';
import ContentWrapper from './ContentWrapper';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { axiosPublic } from '@lib/apis/axios';
import { useQueryClient } from 'react-query';
import { useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import queryKeys from '@lib/constants/queryKeys';
import { selectIsKid } from '@store/slices/authSlice';
import CustomThreeDots from '@components/common/loadingSpinners/CustomThreeDots';
import { theme } from '@lib/styles/theme';

interface HomeTemplateProps {
  children: React.ReactNode;
}

function HomeTemplate({ children }: HomeTemplateProps) {
  const queryClient = useQueryClient();
  const selectedKid = useAppSelector(selectSelectedKid);
  const isKid = useAppSelector(selectIsKid);
  const hasMultipleKids =
    isKid === false && useAppSelector(selectHasMultipleKids);

  const refreshKidHome = () => {
    queryClient.invalidateQueries(queryKeys.CHALLENGE_PROGRESS);
    queryClient.invalidateQueries([queryKeys.CHALLENGE, 'walking']);
    queryClient.invalidateQueries([queryKeys.CHALLENGE, 'pending']);
  };

  const refreshParentHome = () => {
    queryClient.invalidateQueries([
      queryKeys.CHALLENGE_KID_PROGRESS,
      selectedKid?.kidId,
    ]);
    queryClient.invalidateQueries([
      queryKeys.CHALLENGE_KID,
      selectedKid?.kidId,
      'pending',
    ]);
    queryClient.invalidateQueries([
      queryKeys.CHALLENGE_KID,
      selectedKid?.kidId,
      'walking',
    ]);
  };

  return (
    <Wrapper>
      <FixedBar />
      <StyledPullToRefresh
        onRefresh={() => {
          isKid ? refreshKidHome() : refreshParentHome();
          const dummyResponse = axiosPublic.get('/health');
          return dummyResponse;
        }}
        refreshingContent={
          <RefreshingContentWrapper hasMultipleKids={hasMultipleKids!}>
            <CustomThreeDots />
          </RefreshingContentWrapper>
        }
        backgroundColor={theme.palette.greyScale.grey100}
        pullDownThreshold={hasMultipleKids ? 95 : 48}
        maxPullDownDistance={hasMultipleKids ? 145 : 98}
      >
        <>
          <ContentWrapper>{children}</ContentWrapper>
          <Background />
        </>
      </StyledPullToRefresh>
    </Wrapper>
  );
}

export default HomeTemplate;

const StyledPullToRefresh = styled(PullToRefresh)``;

const RefreshingContentWrapper = styled.div<{
  hasMultipleKids: boolean;
}>`
  margin-top: ${({ hasMultipleKids }) => (hasMultipleKids ? '95px' : '48px')};
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.palette.greyScale.grey100};
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
