import { useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectKidsStatus,
} from '@store/slices/kidsSlice';
import styled from 'styled-components';
import KidList from './KidList';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { theme } from '@lib/styles/theme';

interface FixedBarProps {
  colorByLevel: string;
}

function FixedBar({ colorByLevel }: FixedBarProps) {
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);
  const kidsStatus = useAppSelector(selectKidsStatus);
  let kidsContent;
  if (kidsStatus === 'loading') {
    kidsContent = <p>Loading</p>;
  } else if (kidsStatus === 'succeeded') {
    kidsContent = <KidList />;
  } else if (kidsContent === 'failed') {
    kidsContent = <p>Failed</p>;
  }

  return (
    <Wrapper colorByLevel={colorByLevel} hasMultipleKids={hasMultipleKids}>
      <div className="logo-wrapper">
        <BANKIDZ fill={theme.palette.greyScale.white} />
      </div>
      {hasMultipleKids && (
        <KidListWrapper colorByLevel={colorByLevel}>
          {kidsContent}
        </KidListWrapper>
      )}
    </Wrapper>
  );
}

export default FixedBar;

const Wrapper = styled.div<{ colorByLevel: string; hasMultipleKids: boolean }>`
  height: ${({ hasMultipleKids }) => (hasMultipleKids ? '95px' : '48px')};
  z-index: 3;
  background: ${({ colorByLevel }) => colorByLevel};
  transition: ${({ theme }) => theme.transition.kidSelect};
  transition-property: background-color;
  position: fixed;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .logo-wrapper {
    width: 100.24px;
    height: 15.82px;
    margin-left: 19.79px;
    margin-top: 17.73px;
  }
`;

const KidListWrapper = styled.div<{ colorByLevel: string }>`
  margin-top: 38.44px;
  width: 250px;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  z-index: 3;
  width: 100%;
`;
