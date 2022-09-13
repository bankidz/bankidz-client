import { useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectKidsStatus,
} from '@store/slices/kidsSlice';
import styled, { css } from 'styled-components';
import KidList from './KidList';
import { ReactComponent as BANKIDZ } from '@assets/icons/BANKIDZ.svg';
import { ReactComponent as Bell } from '@assets/icons/bell.svg';
import { theme } from '@lib/styles/theme';
import useLevel from '@lib/hooks/useLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import { TPage } from '@lib/types/TPage';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import notificationApi from '@lib/apis/notification/notificationApi';

interface FixedBarProps {
  variant?: Extract<TPage, 'Home' | 'Interest'>;
}

/**
 * 본 컴포넌트는 Home, Interest 2개의 Page에서 사용됩니다.
 * @param variant Interest Page에서 사용되는 경우 'Interest'를 명시합니다.
 */
function FixedBar({ variant = 'Home' }: FixedBarProps) {
  const navigate = useNavigate();
  const level = useLevel();
  const colorByLevel = getColorByLevel(level);

  const hasMultipleKids = useAppSelector(selectHasMultipleKids);
  const kidsStatus = useAppSelector(selectKidsStatus);
  const { data: isAllRead } = useQuery(
    queryKeys.NOTIFICATION_IS_READ,
    notificationApi.getNotificationIsAllRead,
  );
  let kidsList;
  if (kidsStatus === 'loading') {
    kidsList = <p>Loading</p>;
  } else if (kidsStatus === 'succeeded') {
    kidsList = <KidList />;
  } else if (kidsList === 'failed') {
    kidsList = <p>Failed</p>;
  }

  let headerText;
  if (variant === 'Home') {
    headerText = (
      <div className="logo-wrapper">
        <BANKIDZ fill={theme.palette.greyScale.white} />
      </div>
    );
  } else if (variant === 'Interest') {
    headerText = <div className="header-text">이자내역</div>;
  }

  return (
    <Wrapper
      colorByLevel={colorByLevel}
      hasMultipleKids={hasMultipleKids}
      isAllRead={isAllRead!}
    >
      <div className="alert" onClick={() => navigate('/alert')}>
        <Bell />
      </div>
      <div className="logo-wrapper">
        <BANKIDZ fill={theme.palette.greyScale.white} />
      </div>
      {hasMultipleKids && (
        <KidListWrapper colorByLevel={colorByLevel}>{kidsList}</KidListWrapper>
      )}
    </Wrapper>
  );
}

export default FixedBar;

const Wrapper = styled.div<{
  colorByLevel: string;
  hasMultipleKids: boolean;
  isAllRead: boolean;
}>`
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
  .header-text {
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.white};
    margin-left: 16px;
    margin-top: 16px;
    margin-bottom: -3.8px;
  }

  .alert {
    position: absolute;
    top: 0px;
    right: 6px;
    cursor: pointer;
  }
  ${({ isAllRead }) =>
    isAllRead === false &&
    css`
      .alert:after {
        content: '';
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.palette.sementic.red300};
        position: absolute;
        right: 14px;
        top: 14px;
      }
    `}
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
