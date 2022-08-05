import { TItemName } from '@lib/types/kid';
import renderItemIllust from '@lib/utils/common/renderItemIllust';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Failed } from '@assets/icons/failed.svg';
import { ReactComponent as Arrow } from '@assets/icons/arrow-walking.svg';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import DongilFailed from '@components/common/bottomSheets/sheetContents/DongilFailed';
import { TInterestRate } from '@lib/types/common';
import DeleteCheck from '@components/common/bottomSheets/sheetContents/DeleteCheck';
import SheetCompleted from '@components/common/bottomSheets/sheetContents/SheetCompleted';
interface WalkingDongilItemProps {
  itemName: TItemName;
  title: string;
  isFailed: boolean;
  to: string;
  interestRate: TInterestRate;
}

function WalkingDongilItem({
  itemName,
  title,
  to,
  isFailed,
  interestRate,
}: WalkingDongilItemProps) {
  const navigate = useNavigate();
  const onNavigateWalkingDongilPage = () => {
    navigate(to);
  };
  const [openDongilFailed, onOpenDongilFailed, onDismissDongilFailed] =
    useBottomSheet(false);
  const [openDeleteCheck, onOpenDeleteCheck, onDismissDeleteCheck] =
    useBottomSheet(false);
  const [openSheetComplete, onOpenSheetComplete, onDismissSheetComplete] =
    useBottomSheet(false);
  return (
    <>
      {isFailed ? (
        <StyledDiv onClick={onOpenDongilFailed}>
          <div>
            <div>{renderItemIllust(itemName)}</div>
            <span>{title}</span>
          </div>
          <div>
            <Failed />
            <Arrow />
          </div>
        </StyledDiv>
      ) : (
        <StyledLink to={to}>
          <div>
            <div>{renderItemIllust(itemName)}</div>
            <span>{title}</span>
          </div>
          <Arrow />
        </StyledLink>
      )}

      <CommonSheet open={openDongilFailed} onDismiss={onDismissDongilFailed}>
        <DongilFailed
          onLeftButtonClick={() => {
            onOpenDeleteCheck();
            onDismissDongilFailed();
          }}
          onRightButtonClick={() => {
            onNavigateWalkingDongilPage();
          }}
          title={title}
          interestRate={interestRate}
        />
      </CommonSheet>
      <CommonSheet open={openDeleteCheck} onDismiss={() => {}}>
        <DeleteCheck
          onClickDelete={() => {
            onDismissDeleteCheck();
            onOpenSheetComplete();
          }}
          onDismiss={onDismissDeleteCheck}
        />
      </CommonSheet>
      <CommonSheet open={openSheetComplete} onDismiss={() => {}}>
        <SheetCompleted type="delete" onDismiss={onDismissSheetComplete} />
      </CommonSheet>
    </>
  );
}

export default WalkingDongilItem;

const StyledLink = styled(Link)`
  width: 100%;
  height: 54px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 8px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
      width: 30px;
    }

    span {
      margin-left: 12px;
      ${({ theme }) => theme.typo.button.Title_T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 54px;
  background: ${({ theme }) => theme.palette.sementic.red100};
  border: 2px solid ${({ theme }) => theme.palette.sementic.red300};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 16px;

  & > div:first-child {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
      width: 30px;
    }

    span {
      margin-left: 12px;
      ${({ theme }) => theme.typo.button.Title_T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
  }
  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
