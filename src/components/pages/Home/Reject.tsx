import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import GoBackHeader from '@components/atoms/buttons/GoBackHeader';
import SheetButton from '@components/atoms/buttons/SheetButton';
import InputForm from '@components/atoms/forms/InputForm';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useValidation, { TValidationResult } from '@lib/hooks/useValidation';

function Reject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [validateComment, checkValidateComment] = useValidation();
  const { isOpen, setOpenBottomSheet, setCloseBottomSheet } =
    useGlobalBottomSheet();

  //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    checkValidateComment('comment', comment);
  }, [comment]);

  // '피드백이 전송되었어요' 바텀시트 열기
  const openFeedBackCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      contentProps: {
        type: 'feedback',
        onMainActionClick: () => {
          setCloseBottomSheet();
          navigate('/');
        },
      },
    });
  };

  const { mutate: mutateRejectProposedDongil } = useMutation(
    challengeAPI.patchChallenge,
    { onSuccess: openFeedBackCompletedSheet },
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutateRejectProposedDongil({
      challengeId: parseInt(id!),
      accept: false,
      comment,
    });
  };

  return (
    <Wrapper>
      <GoBackHeader to="/" />
      <MarginTemplate>
        <h1>거절 사유를 전송해요</h1>

        <InputSection validate={validateComment}>
          <form onSubmit={handleSubmit}>
            <InputForm
              placeholder="금융 성장에 도움될 피드백을 작성해요"
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setComment(e.target.value);
              }}
              onBlur={() => {
                checkValidateComment('comment', comment);
              }}
              error={validateComment.error}
            />
          </form>
          <p>{validateComment.message}</p>
        </InputSection>
      </MarginTemplate>
      <SheetButton
        label="피드백 보내기"
        outerSheet={true}
        onClickNext={handleSubmit}
        disabledNext={comment.length > 15 || comment.length < 1}
      />
    </Wrapper>
  );
}

export default Reject;

const Wrapper = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.palette.greyScale.grey100};
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  h1 {
    margin: 16px 0px 96px 8px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const InputSection = styled.div<{ validate: TValidationResult }>`
  & > p {
    ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
    color: ${({ theme, validate }) =>
      validate.error
        ? theme.palette.sementic.red300
        : validate.message === '좋은 피드백을 작성하셨네요!'
        ? theme.palette.sementic.green300
        : theme.palette.greyScale.grey500};
    margin: 12px 16px 0px 16px;
  }
`;
