import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TItemName } from '@lib/types/TItemName';
import { TInterestRate } from '@lib/types/IInterestRate';
import renderItemIllust from '@lib/utils/render/renderItemIllust';
import { ReactComponent as Failed } from '@assets/icons/failed.svg';
import { ReactComponent as Arrow } from '@assets/icons/arrow-walking.svg';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import { TDongilStatus } from '@lib/types/TDongilStatus';
import CommonSheet from '@components/common/bottomSheets/commonSheet/CommonSheet';
import DongilFailed from '@components/common/bottomSheets/commonSheet/DongilFailed';
import DeleteCheck from '@components/common/bottomSheets/commonSheet/DeleteCheck';
import SheetCompleted from '@components/common/bottomSheets/commonSheet/SheetCompleted';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useState } from 'react';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  deleteClientSideWalkingDongilById,
  deleteWalkingDongil,
  selectWalkingDongils,
} from '@store/slices/walkingDongilsSlice';

interface WalkingDongilItemProps {
  itemName: TItemName;
  title: string;
  id: number;
  interestRate: TInterestRate;
  challengeStatus: TDongilStatus;
}

function WalkingDongilItem({
  itemName,
  title,
  id,
  interestRate,
  challengeStatus,
}: WalkingDongilItemProps) {
  const navigate = useNavigate();
  const to = `/detail/${id}`;

  const [openDongilFailed, onOpenDongilFailed, onDismissDongilFailed] =
    useBottomSheet(false);
  const [openDeleteCheck, onOpenDeleteCheck, onDismissDeleteCheck] =
    useBottomSheet(false);
  const [openSheetComplete, onOpenSheetComplete, onDismissSheetComplete] =
    useBottomSheet(false);

  const axiosPrivate = useAxiosPrivate();
  const [deleteWalkingDongilStatus, setDeleteWalingDongilStatus] =
    useState<TFetchStatus>('idle');
  const canDeleteWalkingDongil =
    deleteWalkingDongilStatus === 'idle' && challengeStatus === 'FAILED';
  const dispatch = useAppDispatch();

  async function handleDeleteButtonClick() {
    if (canDeleteWalkingDongil) {
      try {
        setDeleteWalingDongilStatus('pending');
        await dispatch(
          deleteWalkingDongil({
            axiosPrivate,
            id,
          }),
        ).unwrap();
        dispatch(deleteClientSideWalkingDongilById(id));
        onDismissDeleteCheck();
        onOpenSheetComplete();
      } catch (error: any) {
        console.log(error);
      } finally {
        setDeleteWalingDongilStatus('idle');
      }
    }
  }

  return (
    <>
      {challengeStatus === 'FAILED' ? (
        <StyledDiv onClick={onOpenDongilFailed}>
          <div className="content-wrapper">
            <div className="illust">{renderItemIllust(itemName)}</div>
            <span>{title}</span>
          </div>
          <div className="icon-wrapper">
            <Failed />
            <Arrow />
          </div>
        </StyledDiv>
      ) : (
        <StyledLink to={to}>
          <div className="content-wrapper">
            <div className="illust">{renderItemIllust(itemName)}</div>
            <span>{title}</span>
          </div>
          <Arrow />
        </StyledLink>
      )}

      {/* 돈길 걷기에 실패했어요 */}
      <CommonSheet open={openDongilFailed} onDismiss={onDismissDongilFailed}>
        <DongilFailed
          onDeleteButtonClick={() => {
            onDismissDongilFailed();
            onOpenDeleteCheck();
          }}
          onCancelButtonClick={() => {
            navigate(to);
          }}
          title={title}
          interestRate={interestRate}
        />
      </CommonSheet>
      {/* 정말로 삭제할거예요? */}
      <CommonSheet open={openDeleteCheck} onDismiss={onDismissDeleteCheck}>
        <DeleteCheck
          onClickDelete={handleDeleteButtonClick}
          onDismiss={onDismissDeleteCheck}
        />
      </CommonSheet>
      {/* 삭제되었어요! */}
      <CommonSheet open={openSheetComplete} onDismiss={onDismissSheetComplete}>
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

  .content-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .illust {
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

  .content-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .illust {
      width: 30px;
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
    gap: 8px;
  }
`;
