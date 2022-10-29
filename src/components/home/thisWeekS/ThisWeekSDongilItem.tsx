import renderItemIllust from '@lib/utils/render/renderItemIllust';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as AchievedStamp } from '@assets/illusts/etc/stamp_parent.svg';
import React from 'react';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import { ReactComponent as Failed } from '@assets/icons/failed.svg';
import { ReactComponent as Arrow } from '@assets/icons/arrow-dongil.svg';

interface ThisWeekSDongilItemProps
  extends Pick<
    IChallengeDTO,
    'itemName' | 'title' | 'progressList' | 'challengeStatus'
  > {
  to: string;
}

function ThisWeekSDongilItem({
  itemName,
  title,
  progressList,
  challengeStatus,
  to,
}: ThisWeekSDongilItemProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <StyledButton onClick={handleClick} isFailed={challengeStatus === 'FAILED'}>
      <div className="content-wrapper">
        <div className="illust">{renderItemIllust(itemName)}</div>
        <span>{title}</span>
      </div>
      <div className="icon-wrapper">
        {progressList?.slice(-1)[0]?.isAchieved && (
          <div className="achieved-stamp">
            <AchievedStamp />
          </div>
        )}
        {challengeStatus === 'FAILED' && (
          <div className="failed-stamp">
            <Failed />
          </div>
        )}
        <div className="arrow">
          <Arrow />
        </div>
      </div>
    </StyledButton>
  );
}

export default React.memo(ThisWeekSDongilItem);

const StyledButton = styled.button<{ isFailed: boolean }>`
  width: 100%;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 8px;

  ${({ isFailed }) =>
    isFailed
      ? css`
          background: ${({ theme }) => theme.palette.sementic.red100};
          border: 2px solid ${({ theme }) => theme.palette.sementic.red300};
        `
      : css`
          background: ${({ theme }) => theme.palette.greyScale.white};
        `}

  display: flex;
  justify-content: space-between;
  align-items: center;

  .content-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .illust {
      width: 30px;
      margin-left: 16px;
    }
    span {
      margin-left: 12px;
      ${({ theme }) => theme.typo.button.Title_T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .achieved-stamp {
      margin-right: 16px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .failed-stamp {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
    .arrow {
      margin-right: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
