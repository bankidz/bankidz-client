import CommonSheet from '@components/common/bottomSheets/CommonSheet';
import SheetCompleted from '@components/common/bottomSheets/sheetContents/SheetCompleted';
import GoBackHeader from '@components/common/buttons/GoBackHeader';
import InputForm from '@components/common/InputForm';
import MarginTemplate from '@components/layout/MarginTemplate';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import useValidation, { TValidationResult } from '@lib/hooks/useValidation';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Reject() {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [validateComment, checkValidateComment] = useValidation();
  const [openFeedBack, onFeedBackOpen, onFeedBackDismiss] =
    useBottomSheet(false);

  //form 값이 바뀔때마다 유효성검사 실행
  useEffect(() => {
    checkValidateComment('comment', comment);
  }, [comment]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // PATCH API fetch code goes here
    if (comment.length <= 15) {
      onFeedBackOpen();
    }
  };

  return (
    <Wrapper>
      <GoBackHeader />
      <MarginTemplate>
        <h1>거절 사유를 전송해요</h1>

        <InputSection validate={validateComment}>
          <form onSubmit={handleSubmit}>
            <InputForm
              placeholder="돈길 이름을 입력하세요"
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
      <CommonSheet open={openFeedBack} onDismiss={onFeedBackDismiss}>
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
