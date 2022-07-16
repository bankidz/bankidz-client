import { HTMLAttributes } from 'react';
import styled from 'styled-components';

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
}

function InputForm({
  placeholder,
  value,
  onChange,
  error,
  readonly = false,
  sheetOpen = false,
  ...props
}: InputFormProps) {
  return (
    <Wrapper
      type={'text'}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      error={error}
      sheetOpen={sheetOpen}
      readOnly={readonly}
      {...props}
    />
  );
}

export default InputForm;

const Wrapper = styled.input<{ error: boolean; sheetOpen: boolean }>`
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
`;
