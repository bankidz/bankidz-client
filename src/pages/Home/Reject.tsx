import GoBackHeader from '@components/common/buttons/GoBackHeader';
import InputForm from '@components/common/InputForm';
import MarginTemplate from '@components/layout/MarginTemplate';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useValidation, { TValidationResult } from '@lib/hooks/useValidation';
import { useAppDispatch } from '@store/app/hooks';
import { rejectProposedDongil } from '@store/slices/proposedDongilsSlice';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

function Reject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [validateComment, checkValidateComment] = useValidation();
  const { isOpen, setOpenBottomSheet, setCloseBottomSheet } =
    useGlobalBottomSheet();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    checkValidateComment('comment', comment);
  }, [comment]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length <= 15) {
      try {
        await dispatch(
          rejectProposedDongil({
            axiosPrivate,
            idToApprove: parseInt(id!),
            comment: comment,
          }),
        ).unwrap();
      } catch (err) {
        console.error(err);
      }
      openFeedBackCompletedSheet();
    }
  };

  // '피드백이 전송되었어요' 바텀시트 열기
  const openFeedBackCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      sheetProps: { open: true },
      contentProps: {
        type: 'feedback',
        onDismiss: () => {
          setCloseBottomSheet();
          navigate('/');
        },
      },
    });
  };

  return (
    <Wrapper>
      <GoBackHeader />
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
    </Wrapper>
  );
}

export default Reject;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.grey100};
  width: 100%;
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
