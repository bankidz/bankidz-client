import { TItemName } from '@lib/types/TItemName';
import renderItemIllust from '@lib/utils/render/renderItemIllust';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as AchievedStamp } from '@assets/illusts/etc/stamp_parent.svg';
import { IDongil } from '@lib/types/IDongil';

interface ThisWeekSDongilItemProps
  extends Pick<IDongil, 'itemName' | 'title' | 'progressList'> {
  to: string;
}

function ThisWeekSDongilItem({
  itemName,
  title,
  progressList,
  to,
}: ThisWeekSDongilItemProps) {
  return (
    <StyledLink to={to}>
      <div className="content-wrapper">
        <div className="illust">{renderItemIllust(itemName)}</div>
        <span>{title}</span>
      </div>
      <div className="achieved-stamp">
        {progressList && progressList.slice(-1)[0].isAchieved && (
          <AchievedStamp />
        )}
      </div>
    </StyledLink>
  );
}

export default ThisWeekSDongilItem;

const StyledLink = styled(Link)`
  width: 100%;
  height: 54px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 8px;

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
  .achieved-stamp {
    margin-right: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
