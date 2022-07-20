import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface InputFormProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /* 유효성 검사 후 조건에 따라 빨간색 테두리로 나타납니다  */
  error: boolean;
  /* 바텀시트를 사용하는 경우에 true */
  readonly?: boolean;
  /* 바텀시트가 올라와있는 상황에 포커스와 같은 스타일을 보여줍니다 */
  sheetOpen?: boolean;
  postfix?: '년' | '월' | '일';
}

function InputForm({
  placeholder,
  value,
  onChange,
  error,
  readonly = false,
  sheetOpen = false,
  postfix,
  ...props
}: InputFormProps) {
  return (
    <Wrapper value={value} postfix={postfix}>
      <InputBox
        type={'text'}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        error={error}
        sheetOpen={sheetOpen}
        readOnly={readonly}
        postfix={postfix}
        {...props}
      />
      {postfix && <p>{postfix}</p>}
    </Wrapper>
  );
}

export default InputForm;

const Wrapper = styled.div<{
  value: string | number;
  postfix: '년' | '월' | '일' | undefined;
}>`
  position: relative;
  & > p {
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    ${({ postfix }) =>
      postfix === '년'
        ? css`
            right: calc((100% - 6px) / 2 - 27px);
          `
        : css`
            right: calc((100% - 6px) / 2 - 16px);
          `}
    ${({ theme }) => theme.typo.input.TextField_T_16_EB};
    color: ${({ value, theme }) =>
      value ? theme.palette.greyScale.black : theme.palette.greyScale.grey300};
  }

  /* hide number type input arrow */
  /* https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

const InputBox = styled.input<{
  error: boolean;
  sheetOpen: boolean;
  postfix?: '년' | '월' | '일';
}>`
  width: 100%;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: 20px 13px;
  ${({ theme }) => theme.typo.input.TextField_T_16_EB};
  color: ${({ theme }) => theme.palette.greyScale.black};
  &::placeholder {
    color: ${({ theme }) => theme.palette.greyScale.grey300};
  }
  border: 3px solid ${({ theme }) => theme.palette.main.yellow100};
  border-color: ${({ theme, error, sheetOpen }) =>
    error
      ? theme.palette.sementic.red200
      : sheetOpen
      ? theme.palette.main.yellow300
      : theme.palette.main.yellow100};
  &:focus {
    border-color: ${({ theme, error }) =>
      error ? theme.palette.sementic.red200 : theme.palette.main.yellow300};
  }
  ${({ postfix }) =>
    postfix === '년' &&
    css`
      padding-left: calc((100% - 6px) / 2 - 30px);
    `}
  ${({ postfix }) =>
    (postfix === '월' || postfix === '일') &&
    css`
      padding-left: calc((100% - 6px) / 2 - 19px);
    `}
`;
