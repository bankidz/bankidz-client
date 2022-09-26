import styled from 'styled-components';
import FixedBar from './FixedBar';
import Background from '@components/home/homeTemplate/Background';
import ContentWrapper from './ContentWrapper';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { axiosPublic } from '@lib/apis/axios';
import CustomThreeDots from '@components/common/loadingSpinners/CustomThreeDots';
import useLevel from '@lib/hooks/useLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import { useQueryClient } from 'react-query';
import { useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import queryKeys from '@lib/constants/queryKeys';
import { selectIsKid } from '@store/slices/authSlice';

interface HomeTemplateProps {
  children: React.ReactNode;
}

function HomeTemplate({ children }: HomeTemplateProps) {
  const level = useLevel();
  const colorByLevel = getColorByLevel(level);
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
          <RefreshingContentWrapper
            colorByLevel={colorByLevel}
            hasMultipleKids={hasMultipleKids!}
          >
            <CustomThreeDots />
          </RefreshingContentWrapper>
        }
        backgroundColor="FAFAFC" // grey 100
        pullDownThreshold={hasMultipleKids ? 93 : 46}
        maxPullDownDistance={hasMultipleKids ? 143 : 98}
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
  colorByLevel: string;
  hasMultipleKids: boolean;
}>`
  margin-top: ${({ hasMultipleKids }) => (hasMultipleKids ? '93px' : '46px')};
  width: 100%;
  height: 50px;
  background: ${({ colorByLevel }) => colorByLevel};
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
