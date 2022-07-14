import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputFormProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  readonly?: boolean;
}

function InputForm({
  placeholder,
  value,
  onChange,
  error,
  readonly = false,
  ...props
}: InputFormProps) {
  return (
    <Wrapper
      type={'text'}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      error={error}
      readOnly={readonly}
      {...props}
    />
  );
}

export default InputForm;

const Wrapper = styled.input<{ error: boolean }>`
  width: 100%;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 3px solid
    ${({ theme, error }) =>
      error ? theme.palette.sementic.red200 : theme.palette.main.yellow300};
  padding: 20px 16px;
  ${({ theme }) => theme.typo.input.TextField_T_16_EB};
  color: ${({ theme }) => theme.palette.greyScale.black};
  :not(:focus) {
    border: 3px solid ${({ theme }) => theme.palette.main.yellow100};
  }
  &::placeholder {
    color: ${({ theme }) => theme.palette.greyScale.grey300};
  }
`;
