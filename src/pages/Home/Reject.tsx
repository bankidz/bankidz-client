import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import SheetCompleted from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import GoBackHeader from '@components/common/buttons/GoBackHeader';
import InputForm from '@components/common/InputForm';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Reject() {
  const [comment, setComment] = useState('');
  const [isValidComment, setIsValidComment] = useState(false);
  const [commentFocus, setCommentFocus] = useState(false);

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value.slice(0, 15));
  }

  useEffect(() => {
    if (comment.length <= 15) {
      setIsValidComment(true);
    } else {
      setIsValidComment(false);
    }
  }, [comment]);

  const toggleInstructionMessage = commentFocus && !comment;
  const toggleValidMessage = commentFocus && comment && isValidComment;

  const navigate = useNavigate();
  const [openFeedBack, onFeedBackOpen, onFeedBackDismiss] =
    useBottomSheet(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // PATCH API fetch code goes here
    onFeedBackOpen();
  }
  return (
    <Wrapper>
      <GoBackHeader />
      {/* <header>거절 사유를 입력해요</header>
      <form onSubmit={handleSubmit}>
        <InputForm
          placeholder="금융 성장에 도움될 피드백을 작성해요"
          onChange={handleCommentChange}
          value={comment}
          // @ts-expect-error
          error={comment && !isValidComment}
          autoFocus
          type="text"
          required
          onFocus={() => setCommentFocus(true)}
          onBlur={() => setCommentFocus(false)}
          autoComplete="off"
        />
      </form>

      <InstructionMessage
        className={toggleInstructionMessage ? 'active' : undefined}
      >
        공백포함 15자 이하로 부탁해요!
      </InstructionMessage>
      {comment && (
        <ValidMessage className={toggleValidMessage ? 'active' : undefined}>
          좋은 피드백을 작성하셨네요!
        </ValidMessage>
      )} */}

      <CommonSheet
        open={openFeedBack}
        onDismiss={() => {
          navigate('/');
        }}
      >
        <SheetCompleted
          type="delete"
          onDismiss={() => {
            navigate('/');
          }}
        />
      </CommonSheet>
    </Wrapper>
  );
}

export default Reject;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.greyScale.grey100};
  width: 100%;
  height: 100vh;

  header {
    margin-top: 16px;
    margin-left: 26px;
    width: 222px;
    height: 24px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  form {
    margin-top: 96px;
    margin-left: 18px;
    margin-right: 18px;
  }
`;

const InstructionMessage = styled.div`
  position: absolute;
  margin-top: 12px;
  width: 100%;
  ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
  color: ${({ theme }) => theme.palette.greyScale.grey100};
  &.active {
    transition: ${({ theme }) => theme.transition.onFocus};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;

const ValidMessage = styled.div`
  position: absolute;
  margin-top: 12px;
  width: 100%;
  ${({ theme }) => theme.typo.input.TextMessage_S_12_M}
  color: ${({ theme }) => theme.palette.greyScale.grey100};
  &.active {
    transition: ${({ theme }) => theme.transition.onFocus};
    color: ${({ theme }) => theme.palette.sementic.green300};
  }
`;
