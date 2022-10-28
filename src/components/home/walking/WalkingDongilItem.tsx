import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import renderItemIllust from '@lib/utils/render/renderItemIllust';
import { ReactComponent as Failed } from '@assets/icons/failed.svg';
import { ReactComponent as Arrow } from '@assets/icons/arrow-dongil.svg';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { useMutation, useQueryClient } from 'react-query';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import React from 'react';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

interface WalkingDongilItemProps
  extends Pick<
    IChallengeDTO,
    'itemName' | 'title' | 'id' | 'challengeStatus' | 'interestRate'
  > {}

function WalkingDongilItem({
  itemName,
  title,
  id,
  challengeStatus,
  interestRate,
}: WalkingDongilItemProps) {
  const navigate = useNavigate();
  const to = `/detail/${id}`;

  const { setOpenBottomSheet, setCloseBottomSheet, openSheetBySequence } =
    useGlobalBottomSheet();

  // 4. 삭제되었어요
  const openDeleteCompletedSheet = () => {
    const openSheet = () => {
      setOpenBottomSheet({
        sheetContent: 'Completed',
        contentProps: {
          type: 'delete',
        },
      });
    };
    openSheetBySequence(openSheet);
  };

  // 3. 걷고있는 돈길 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(challengeAPI.deleteChallenge, {
    onSuccess: () => {
      openDeleteCompletedSheet();
      queryClient.invalidateQueries([queryKeys.CHALLENGE, 'walking']);
    },
  });
  const handleDeleteButtonClick = () => {
    challengeStatus === 'FAILED' && deleteMutation.mutate(id);
  };

  // 2. 정말로 삭제할까요?
  const openWarningDeleteSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Warning',
        contentProps: {
          type: 'delete',
          onMainActionClick: handleDeleteButtonClick,
          onDismiss: setCloseBottomSheet,
        },
      });
    openSheetBySequence(openSheet);
  };

  // 1. 돈길 걷기에 실패했어요
  const openDongilFailedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'DongilFailed',
      contentProps: {
        title,
        interestRate,
        onDeleteButtonClick: openWarningDeleteSheet,
        onCancelButtonClick: () => {
          setCloseBottomSheet();
          navigate(to);
        },
      },
    });
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

export default React.memo(WalkingDongilItem);

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
