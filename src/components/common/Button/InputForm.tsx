import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputFormProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: boolean;
  readonly?: boolean;
}

function InputForm({
  placeholder,
  value,
  onChange,
  validation,
  readonly = false,
  ...props
}: InputFormProps) {
  return (
    <Wrapper
      type={'text'}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      validation={validation}
      readOnly={readonly}
      {...props}
    />
  );
}

export default InputForm;

const Wrapper = styled.input<{ validation: boolean }>`
  width: 100%;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 3px solid
    ${({ theme, validation }) =>
      validation
        ? theme.palette.main.yellow300
        : theme.palette.sementic.red200};
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
