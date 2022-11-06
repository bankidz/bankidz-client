import styled from 'styled-components';
import LevelBadge from '@components/shared/badges/LevelBadge';
import MarginTemplate from '@components/shared/layout/MarginTemplate';
import useLevel from '@lib/hooks/useLevel';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { selectHasMultipleKids } from '@store/slices/kidsSlice';

interface ContentProps {
  children: React.ReactNode;
}

function ContentWrapper({ children }: ContentProps) {
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);
  const level = useLevel();

  let headerText;
  const isKid = useAppSelector(selectIsKid);
  if (isKid === true) {
    headerText = '돈길 걷는\n뱅키는 행복해요';
  } else if (isKid === false) {
    headerText = '돈길 걷는\n자녀 뱅키는 행복해요';
  }

  return (
    <Wrapper>
      <MarginTemplate>
        <FlexContainer>
          <StyledHeader hasMultipleKids={hasMultipleKids!}>
            {headerText}
          </StyledHeader>
          <LevelBadgeWrapper>
            <LevelBadge level={level!} />
          </LevelBadgeWrapper>
        </FlexContainer>
        {children}
      </MarginTemplate>
    </Wrapper>
  );
}

export default ContentWrapper;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  position: absolute;
  z-index: 2;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LevelBadgeWrapper = styled.div`
  margin-top: 24px;
  margin-left: 10px;
`;

const StyledHeader = styled.h1<{ hasMultipleKids: boolean }>`
  margin-top: ${({ hasMultipleKids }) => (hasMultipleKids ? '141px' : '64px')};
  margin-left: 10px;
  width: 308px;
  height: 58px;
  white-space: pre-line;

  ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
  color: ${({ theme }) => theme.palette.greyScale.white};
  line-height: 150%;
`;
