import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import renderItemIllust from '@lib/utils/render/renderItemIllust';
import { ReactComponent as Failed } from '@assets/icons/failed.svg';
import { ReactComponent as Arrow } from '@assets/icons/arrow-walking.svg';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useState } from 'react';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { useAppDispatch } from '@store/app/hooks';
import {
  deleteClientSideWalkingDongilById,
  deleteWalkingDongil,
} from '@store/slices/walkingDongilsSlice';
import { IDongil } from '@lib/types/IDongil';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

interface WalkingDongilItemProps
  extends Pick<
    IDongil,
    'itemName' | 'title' | 'id' | 'interestRate' | 'challengeStatus'
  > {}

function WalkingDongilItem({
  itemName,
  title,
  id,
  interestRate,
  challengeStatus,
}: WalkingDongilItemProps) {
  const navigate = useNavigate();
  const to = `/detail/${id}`;
  const { setOpenBottomSheet, setCloseBottomSheet, openSheetBySequence } =
    useGlobalBottomSheet();

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
        // 삭제되었어요 바텀시트 열기
        openDeleteCompletedSheet();
      } catch (error: any) {
        console.log(error);
      } finally {
        setDeleteWalingDongilStatus('idle');
      }
    }
  }
  // 1. '돈길 걷기에 실패했어요' 바텀시트 열기
  const openDongilFailedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'DongilFailed',
      sheetProps: {
        open: true,
      },
      contentProps: {
        onDeleteButtonClick: openDeleteCheckSheet,
        onCancelButtonClick: () => {
          setCloseBottomSheet();
          navigate(to);
        },
      },
    });
  };

  // 2. '정말로 삭제할까요?' 바텀시트 열기
  const openDeleteCheckSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'DeleteCheck',
        sheetProps: { open: true },
        contentProps: {
          onClickDelete: handleDeleteButtonClick,
          onDismiss: setCloseBottomSheet,
        },
      });
    openSheetBySequence(openSheet);
  };

  // 3. '삭제되었어요' 바텀시트 열기
  const openDeleteCompletedSheet = () => {
    const openSheet = () => {
      setOpenBottomSheet({
        sheetContent: 'SheetCompleted',
        sheetProps: { open: true },
        contentProps: {
          type: 'delete',
        },
      });
    };
    openSheetBySequence(openSheet);
  };

  return (
    <>
      {challengeStatus === 'FAILED' ? (
        <StyledDiv onClick={openDongilFailedSheet}>
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
