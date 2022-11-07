import { forwardRef, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

/**
 * @param readonly 바텀시트를 사용하는 경우에 true로 설정합니다.
 * @param sheetOpen 포커스가 되어있지 않아도 포커스된 스타일을 보여줍니다.
 * (바텀시트가 열려있는 상황)
 * @param disabled 선택할 수 없는 인풋 입니다.
 * @param bigFontSize 이자율, 매주 저금액의 경우 사용합니다.
 */
interface InputFormProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | number;
  error: boolean;
  readonly?: boolean;
  sheetOpen?: boolean;
  disabled?: boolean;
  bigFontSize?: boolean;
  autoFocus?: boolean;
  postfix?: '년' | '월' | '일';
}

function InputForm(
  {
    placeholder,
    value,
    onChange,
    error,
    readonly = false,
    sheetOpen = false,
    postfix,
    autoFocus = false,
    bigFontSize = false,
    ...props
  }: InputFormProps,
  ref: any,
) {
  return (
    <Wrapper value={value} postfix={postfix}>
      <InputBox
        onChange={onChange}
        value={value}
        error={error}
        sheetOpen={sheetOpen}
        readOnly={readonly}
        postfix={postfix}
        ref={ref}
        autoFocus={autoFocus}
        bigFontSize={bigFontSize}
        {...props}
        placeholder={placeholder}
      />
      {postfix && <p>{postfix}</p>}
    </Wrapper>
  );
}

export default forwardRef(InputForm);

const Wrapper = styled.div<{
  value: string | number;
  postfix: '년' | '월' | '일' | undefined;
}>`
  box-sizing: border-box;
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
  bigFontSize?: boolean;
}>`
  width: 100%;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: 20px 13px;
  ${({ theme, bigFontSize }) =>
    bigFontSize
      ? theme.typo.input.TextField_Num_T_21_EB
      : theme.typo.input.TextField_T_16_EB}
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
    transition: ${({ theme }) => theme.transition.inputFocus};
    border-color: ${({ theme, error }) =>
      error ? theme.palette.sementic.red200 : theme.palette.main.yellow300};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    border-color: ${({ theme }) => theme.palette.greyScale.grey200};
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
